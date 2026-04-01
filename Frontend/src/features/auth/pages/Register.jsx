import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'


const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(e) {
        e.preventDefault()

    }
    return (

        <main>
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input onInput={(e) => { setUsername(e.target.value) }}
                        type="text" name='Username'
                        placeholder='Enter Username' />
                    <input
                        onInput={(e) => { setEmail(e.target.value) }}
                        type="text" name='Username'
                        placeholder='Enter Email' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="text" name='Password'
                        placeholder='Enter Password' />
                    <button type="submit">Submit</button>
                </form>
                <p>Already have an account? <Link className='toggleAuthform' to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register