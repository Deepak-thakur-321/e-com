// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [user, setUser] = useState(
      () => JSON.parse(localStorage.getItem("fakeUser")) || null
   );

   const login = (email, password) => {
      // Fake validation - koi bhi email/password kaam karega
      const fakeUser = { email, name: email.split("@")[0] };
      localStorage.setItem("fakeUser", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
   };

   const register = (name, email, password) => {
      const fakeUser = { email, name };
      localStorage.setItem("fakeUser", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
   };

   const logout = () => {
      localStorage.removeItem("fakeUser");
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   return useContext(AuthContext);
}