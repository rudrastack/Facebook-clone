import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPrivate, setIsPrivate] = useState(false) 

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleRegister(username, email, password, isPrivate) /

        navigate('/')
    }

    if (loading) {
        return (<main><h1>Loading....</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit} >

                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder='Enter username'
                    />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Enter email address'
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Enter password'
                    />

                    
                    <label style={{ margin: "10px 0", display: "block" }}>
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                        />
                        {" "}Private Account
                    </label>

                    <button className='button primary-button'>Register</button>
                </form>

                <p>
                    Already have an account ?
                    <Link to={"/login"}> Login to account.</Link>
                </p>
            </div>
        </main>
    )
}

export default Register