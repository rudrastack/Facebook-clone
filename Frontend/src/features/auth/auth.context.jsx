


// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     // 🔥 APP LOAD PE CHECK
//     useEffect(() => {
//         const token = localStorage.getItem("token")

//         if (token) {
//             setUser({ token })  // simple user set
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

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
            setUser(JSON.parse(storedUser)) // ✅ ONLY THIS
        }

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )
}