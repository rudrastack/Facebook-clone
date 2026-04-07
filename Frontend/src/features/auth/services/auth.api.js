    import axios from "axios";


    const api = axios.create({
        baseURL: "https://facebook-clone-3vpt.onrender.com/api/authfb",
        // baseURL: "http://localhost:3000/api/authfb",
        withCredentials: true,
    })


    export async function login(username, password) {
        
        const response = await api.post('/login', {
            username, password
        })

    
        localStorage.setItem("user", JSON.stringify(response.data.user))

        return response.data
    }

    export async function register(username, email, password, isPrivate) {
        const response = await api.post('/register', {
            username, email, password, isPrivate
        })

        return response.data
    }

    export async function getMe() {
        const response = await api.get('/get-me')

        return response.data
    }