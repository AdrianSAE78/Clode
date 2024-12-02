
# **Clode - Plataforma de Intercambio de Ropa Usada**

**Clode** es una aplicación desarrollada para fomentar la sostenibilidad y reducir la contaminación ambiental mediante el intercambio de ropa usada. Esta plataforma conecta a personas interesadas en reutilizar prendas, creando un impacto positivo en el medio ambiente y promoviendo un modelo de economía circular.

---

**Objetivo**
El objetivo principal de Clode es ofrecer una solución sostenible que permita a las personas:  
1. **Reducir el desperdicio textil** mediante el intercambio de ropa.  
2. **Contribuir a la disminución de la huella de carbono** generada por la industria de la moda.  
3. **Promover prácticas de consumo responsable y sostenible**.

---

## Funcionalidades
1. **Publicación de prendas:** Los usuarios pueden subir ropa que desean intercambiar.  
2. **Filtros avanzados:** Filtra las prendas por categoría, formal, vernao, deportivo, etc.   
3. **Seleccion de Ropa al gusto** Los usuarios pueden decidir si realizar o no el intercambio
4. **Seguridad en la entrega** Los intercambios se realizaran en un punto seguro y confiable de la ciudad.
5. **Confiabilidad** Los usuarios pueden observar el nivel de fiabilidad de usuario al realizar un intercambio

---

## Tecnologías Utilizadas
- **Frontend:**  
  - React, Material UI.  
- **Backend:**  
  - Python, Django.  
  - Base de datos PostgreSQL.  
- **Otras herramientas:**  
  - Figma.  

---

## Instalación y Configuración
### Requisitos previos
- Python 3.10 o superior.  
- PostgreSQL instalado y configurado.  
- Entorno virtual para gestión de dependencias.

### Pasos de instalación
1. Clona el repositorio de Clode:  
   ```bash
   git clone https://github.com/AdrianSAE78/Clode.git
   cd clode
   ```
2. Crea y activa el entorno virtual:  
   - **Linux/MacOS:**  
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows (CMD):**  
     ```bash
     py -m venv .venv
     .venv\Scripts\activate
     ```
3. Instala las dependencias:  
   ```bash
   pip install -r requirements.txt
   ```
4. Configura la base de datos en el archivo `settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'clode_db',
           'USER': 'tu_usuario',
           'PASSWORD': 'tu_contraseña',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
5. Aplica las migraciones:  
   ```bash
   python manage.py migrate
   ```
6. Inicia el servidor:  
   ```bash
   python manage.py runserver
   ```
7. Abre la aplicación en [http://localhost:8000](http://localhost:8000).

---

## Contribuciones
Clode es un proyecto abierto a mejoras y colaboraciones. Si deseas contribuir, sigue estos pasos:  
1. Haz un fork del repositorio.  
2. Crea una rama para tus cambios:  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Sube tus cambios:  
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
4. Envía un pull request para revisión.

---

## Contacto
Si tienes preguntas o sugerencias, contáctanos:
**Adrian Acuña** - asacuna@puce.edu.ec
**Edwin Cacuango** - efcacuango@puce.edu.ec  
**Ariel Umatambo** - vaumatambo@puce.edu.ec 
**Proyecto Clode** - [Repositorio en GitHub]https://github.com/AdrianSAE78/Clode.git
``` 
