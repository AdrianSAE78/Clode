// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { googleProvider } from "../firebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post("http://localhost:3000/auth/google", { idToken }, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Usuario autenticado:", response.data.user);

      // Actualizamos el estado
      setUser({
        ...result.user,
        ...response.data.user
      });

      console.log(user)

      if (!response.data.profileCompleted) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null)
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);