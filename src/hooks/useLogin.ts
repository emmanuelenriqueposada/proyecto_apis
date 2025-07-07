// src/hooks/useLogin.ts
import { useState } from "react";
import apiClient from "../services/api";

interface LoginResponse {
  user: string;
  token: string;
}

interface LoginError {
  message: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Realizar la solicitud POST al endpoint de inicio de sesión
      const response = await apiClient.post<LoginResponse>("/api/V1/login", {
        email,
        password,
      });

      // Guardar el token en localStorage
      const token = response.data.token;
      console.log("Estes el token" + token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email); 
      

      // Redirigir al usuario a la página principal o dashboard
      window.location.href = "/dashboard"; // Ejemplo de redirección

    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        // Error de credenciales inválidas
        setError({ message: "Email o contraseña incorrectos" });
      } else {
        setError({ message: "Error al iniciar sesión" });
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};