import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router";

function New_Entry() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const history = useHistory()

    async function Submit(e) {
        e.preventDefault()
        let item = { name, email, age }
        let result = await fetch('http://localhost:3000/list', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        result = await result.json()
        history.push('/')
    }

    return (
        <div>
            <Header /><br />
            <div className='col-sm-4 offset-sm-4'>
                <h1>Apply here</h1><br />
                <input className='form-control' type='text' value={name} placeholder='Name'
                    onChange={(e) => { setName(e.target.value) }} /><br />

                <input className='form-control' type='text' value={email} placeholder='Email'
                    onChange={(e) => { setEmail(e.target.value) }} /><br />

                <input className='form-control' type='text' value={age} placeholder='Age'
                    onChange={(e) => { setAge(e.target.value) }} /><br />

                <Button onClick={Submit}>Submit</Button>
            </div>
        </div>
    )
}

export default New_Entry