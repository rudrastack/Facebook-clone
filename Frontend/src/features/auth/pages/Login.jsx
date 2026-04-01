import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { handlelogin, loading } = useAuth()

    const Navigate = useNavigate()

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        handlelogin(username, password)
        .then(res => {
            console.log(res)
            Navigate("/")
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
                        placeholder='Enter Username' />
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