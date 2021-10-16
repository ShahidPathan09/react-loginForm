import React, { useState, useEffect } from "react"
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router"
import Header from "./Header"

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpwd, setConfirmPwd] = useState('')
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/')
        }
    }, [])

    async function signUp() {
        let item = { username, password, confirmpwd }

        if (password == confirmpwd) {
            let result = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            result = await result.json()
            localStorage.setItem('user-info', JSON.stringify(result))
            history.push('/')
        }
        else {
            alert("Passwords didn't match!")
            history.push('/register')
        }
    }

    return (
        <>
            <Header />
            <div className='col-sm-4 offset-sm-4'>
                <h1>Register Page</h1><br />

                <input className='form-control' type='text' placeholder='Username'
                    value={username} onChange={(e) => { setUsername(e.target.value) }} /><br />

                <input className='form-control' type='password' placeholder='Password'
                    value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />

                <input className='form-control' type='password' placeholder='Confirm Password'
                    value={confirmpwd} onChange={(e) => { setConfirmPwd(e.target.value) }} /><br />

                <Button onClick={signUp}>Submit</Button>
            </div>
        </>
    )
}

export default Register