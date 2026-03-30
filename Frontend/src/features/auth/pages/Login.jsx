import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:3000/api/authfb/login", {
            username,
            password
        },
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <main>
            <div className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text" name='Username'
                        placeholder='Enter Username/email' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="text" name='Password'
                        placeholder='Enter Password' />
                    <button type="submit">Submit</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthform' to="/register"> Register</Link></p>

            </div>
        </main>
    )
}

export default Login