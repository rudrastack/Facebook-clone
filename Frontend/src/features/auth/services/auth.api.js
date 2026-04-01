import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:3000/api/authfb",
    withCredentials: true
})

export async function register(username, email, password) {
    try {
        const res = await authApi.post("/register", {
            username,
            email,
            password
        })  

        return res.data
    } 
    catch (err) {
        throw err
    }

}

export async function login(username, password) {
   
    try {  
        const res = await authApi.post("/login", {
            username,
            password
        })
        return res.data
    }
     catch (err) {
        throw err
    }
}   

export async function getMe() {
    try {
        const res = await authApi.get("/get-me")
        return res.data
    } catch (err) {
        throw err
    }
}