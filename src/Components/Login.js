import React, { useState, useEffect } from 'react'
import Header from "./Header"
import { useHistory } from 'react-router'
import { Form, Button } from 'react-bootstrap'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/')
        }
    }, [])

    async function Submit() {
        let item = { username, password }
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

    return (
        <div>
            <Header />
            <h1>Login Page</h1><br />
            <Form className='col-sm-4 offset-sm-4'>
                <input className='form-control' type='text' placeholder='Username' value={username}
                    onChange={(e) => { setUsername(e.target.value) }} /><br />

                <input className='form-control' type='password' placeholder='Password' value={password}
                    onChange={(e) => { setPassword(e.target.value) }} /><br />

                <Button onClick={Submit}>Submit</Button>
            </Form>
        </div>
    )
}

export default Login
