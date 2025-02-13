import { Card, Typography, Box, Avatar, Button, TextField, Modal, Menu, MenuItem } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/pages/admin.css";

const AdminDashboard = () => {
  // Estados para manejar las categorías
  const [categories, setCategories] = useState([]);
  const [categorieName, setCategorieName] = useState("");
  const [categoriePicture, setCategoriePicture] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  

  // Estados para manejar el modal de añadir/editar categoría
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para manejar el menú de opciones (editar/eliminar)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Efecto para cargar las categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

    // Efecto para cargar los usuarios
  
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios

  const fetchUsers = async () => {
      try {
          const response = await axios.get("http://localhost:3000/api/users");
          setUsers(response.data);
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  };

  useEffect(() => {
      fetchCategories();
      fetchUsers(); // Llama a la función al cargar el componente
  }, []);


  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Maneja el clic en una categoría para abrir el menú de opciones
  const handleCategoryClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  // Cierra el menú de opciones
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  // Maneja el cambio de imagen en el formulario y la previsualización
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoriePicture(file); // Guarda el archivo seleccionado
      const imageUrl = URL.createObjectURL(file); // Genera una URL temporal
      setSelectedImagePreview(imageUrl); // Actualiza la previsualización
    }
  };



  // Valida que los campos obligatorios estén llenos
  const validateFields = () => {
    if (!categorieName) {
      alert("El nombre de la categoría es obligatorio.");
      return false;
    }
    return true;
  };

  // Envía los datos del formulario para crear o actualizar una categoría
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;
  
    const formData = new FormData();
    formData.append("categorie_name", categorieName);
  
    if (categoriePicture) { 
      formData.append("categorie_picture", categoriePicture);
    }
  
    try {
      const url = isEditing
        ? `http://localhost:3000/api/categories/${selectedCategory.id}`
        : "http://localhost:3000/api/categories";
  
      const method = isEditing ? "put" : "post";
      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert(isEditing ? "Categoría actualizada exitosamente" : "Categoría añadida exitosamente");
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error.");
    }
  };
  

  // Prepara el modal para editar una categoría
  const handleEditCategory = (category) => {
    if (!category) {
      console.error("Error: Categoría no válida.");
      return;
    }
    setSelectedCategory(category);
    setCategorieName(category.categorie_name);
    setCategoriePicture(category.categorie_picture); // Muestra la imagen actual
    setIsEditing(true);
    setOpenModal(true);
  };

  // Función para actualizar la categoría en el backend
  const handleUpdateCategory = async () => {
    if (!selectedCategory) {
      alert("No se ha seleccionado ninguna categoría.");
      return;
    }

    const formData = new FormData();
    formData.append("categorie_name", categorieName);

    // 🔍 Verificar si se está enviando la imagen correctamente
    if (categoriePicture instanceof File) {
        formData.append("categorie_picture", categoriePicture);
    } else {
        console.warn("No se envió una nueva imagen, manteniendo la imagen anterior.");
    }

    // 🔍 Comprobar qué datos se están enviando antes de hacer la solicitud
    console.log("Datos enviados al backend:", Object.fromEntries(formData));

    try {
      const response = await axios.put(
        `http://localhost:3000/api/categories/${selectedCategory.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      alert("Categoría actualizada exitosamente");
      fetchCategories(); // Recargar categorías
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar categoría:", error.response?.data || error.message);
      alert("Error al actualizar la categoría");
    }
};

  

  // Elimina una categoría
  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/categories/${selectedCategory.id}`);
      alert("Categoría eliminada correctamente");
      fetchCategories();
      handleCloseMenu();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      alert("Error al eliminar la categoría");
    }
  };

  // Cierra el modal y resetea los estados
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
    setCategorieName("");
    setCategoriePicture(null);
    setSelectedCategory(null);
    setSelectedImagePreview(null); // 🔹 Limpiar la previsualización
  };


  return (
    <>
      <Box className="admin-dashboard">
        <Box className="header-admin">
          <Typography variant="h4" className="title">InterMod</Typography>
          <Typography variant="h6" className="subtitle">Panel de Administración</Typography>
          <Avatar className="admin-avatar" src="/profile.jpg" alt="Admin" />
        </Box>

        <Card className="admin-section categories">
          <Typography variant="h5">GESTION DE CATEGORIAS</Typography>
          <Box className="categories-container">
            {categories.map(category => (
              <Box key={category.id} className="category-item" onClick={(e) => handleCategoryClick(e, category)}>
                <img src={`http://localhost:3000/uploads/${category.categorie_picture}`} alt={category.categorie_name} className="category-image" />
                <Typography className="category-name">{category.categorie_name}</Typography>
              </Box>
            ))}
          </Box>
          <Box className="add-category-button">
          <Button variant="contained" onClick={() => {
              setOpenModal(true);
              setCategorieName("");
              setCategoriePicture(null);
              setSelectedImagePreview(null); // Limpiar la previsualización antes de abrir el modal
            }}>Añadir Categoría</Button>
          </Box>
        </Card>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleEditCategory(selectedCategory)} className="menu-item edit-category">Editar categoría</MenuItem>
          <MenuItem onClick={handleDeleteCategory} className="menu-item delete-category">Eliminar categoría</MenuItem>
        </Menu>

        <Modal open={openModal} onClose={handleCloseModal} className="modal-container">
          <Box className="modal-content">
            <Typography variant="h6">{isEditing ? "Editar Categoría" : "Nueva Categoría"}</Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Nombre de la categoría" variant="outlined" fullWidth value={categorieName} onChange={(e) => setCategorieName(e.target.value)} margin="normal" />
              {selectedImagePreview ? (
                <img 
                  src={selectedImagePreview} 
                  alt="Imagen seleccionada" 
                  className="preview-image" 
                />
              ) : (
                categoriePicture && (
                  <img 
                    src={`http://localhost:3000/uploads/${categoriePicture}`} 
                    alt="Imagen actual" 
                    className="preview-image" 
                  />
                )
              )}

              <input type="file" accept="image/*" onChange={handleImageChange} />
              <Box className="modal-buttons">
                {
                  isEditing ?
                  <Button type="button" variant="contained" onClick={handleUpdateCategory}>Guardar Cambios</Button>
                  : <Button type="button" variant="contained" onClick={handleSubmit}>Crear Categoria</Button>

                }
                <Button variant="contained" onClick={handleCloseModal}>Cancelar</Button>
              </Box>
            </form>
          </Box>
        </Modal>

        
        {/* Gestión de Usuarios (para futura implementación) */}
        <Card className="admin-section users">
          <Typography variant="h5">Gestión de Usuarios</Typography>
          <Box className="user-container">
              {users.length > 0 ? (
                  users.map(user => (
                      <Box key={user.id} className="user-item">
                          <img 
                              src={`http://localhost:3000/uploads/${user.profile_picture}`} 
                              alt={user.first_name} 
                              className="user-image" 
                          />
                          <Box className="user-info">
                              <Typography className="user-name">
                                  {user.first_name} {user.last_name}
                              </Typography>
                              <Typography className="user-email">{user.email}</Typography>
                              <Typography className={`user-status ${user.is_blocked ? "blocked" : "active"}`}>
                                  {user.is_blocked ? "Usuario Bloqueado" : "Usuario Habilitado"}
                              </Typography>
                              <Typography className="user-role">
                                  {user.user_type === "admin" ? "Administrador" : "Usuario"}
                              </Typography>
                          </Box>
                      </Box>
                  ))
              ) : (
                  <Typography>Cargando usuarios...</Typography>
              )}
          </Box>
      </Card>


        {/* Gestión de Prendas (para futura implementación) */}
        <Card className="admin-section garments">
          <Typography variant="h5">Gestión de Prendas</Typography>
          <Box className="garment-container">
            {/* Aquí se renderizarán dinámicamente las prendas */}
            <Box className="garment-item">Buzo de tres franjas</Box>
            <Box className="garment-item">Camiseta blanca</Box>
            <Box className="garment-item">Blusa con tejido</Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default AdminDashboard;
