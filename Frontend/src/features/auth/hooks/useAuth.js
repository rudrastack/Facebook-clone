import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context


const handleLogin = async (username, password) => {

    setLoading(true)

    try {
        const data = await login(username, password)

        setUser(data.user) // ✅ IMPORTANT

    } catch (err) {
        console.log(err)
    }

    setLoading(false)
}
   const handleRegister = async (username, email, password, isPrivate) => {
    setLoading(true)

    try {
        await register(username, email, password, isPrivate)
    } catch (err) {
        console.log(err)
    }

    setLoading(false)
}

    return {
        user, loading, handleLogin, handleRegister
    }

}