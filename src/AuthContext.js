// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => {
//     // Perform your login logic here
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // Perform your logout logic here
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
