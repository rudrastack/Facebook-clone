import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, } from "../services/auth.api";


export const useAuth = () => {
  const context = useContext(AuthContext)

  const { user, setUser } = context

  const handleLogin = async (username, password) => {
    const response = await login(username, password)

    setUser(response.user)

    localStorage.setItem("user", JSON.stringify(response.user))
  }

  const handleRegister = async (username, email, password) => {
    const response = await register(username, email, password)

    setUser(response.user)
  }

  return {
    user,
    handleLogin,
    handleRegister
  }
}