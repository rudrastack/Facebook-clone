// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)
// // AuthContext me
// useEffect(() => {
//   const checkUser = async () => {
//     try {
//       const res = await getMe()
//       setUser(res.user)
//     } catch {
//       setUser(null)
//     } finally {
//       setLoading(false)
//     }
//   }

//   checkUser()
// }, [])

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user")

//         if (storedUser) {
//             setUser(JSON.parse(storedUser))
//         }

//         setLoading(false)
//     }, [])

//     return (
//         <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"; // ✅ import karna mat bhool


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const checkUser = async () => {

    // 👇 YAHI ADD KARNA HAI
 if (!localStorage.getItem("user")) {
  setLoading(false)
  return
}

    try {
      const res = await getMe();
      setUser(res.user);

      localStorage.setItem("user", JSON.stringify(res.user));
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};