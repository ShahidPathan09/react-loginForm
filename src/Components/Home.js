import React, { useState, useEffect } from "react"
import Header from "./Header"
import { Table, Button } from 'react-bootstrap'

function Home() {
    const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let result = await fetch('http://localhost:3000/list')
        result = await result.json()
        setData(result)
        setName(result[0].name)
        setEmail(result[0].email)
        setAge(result[0].age)
        setUserId(result[0].id)
    }

    async function deleteData(id) {
        let result = await fetch(`http://localhost:3000/list/${id}`, {
            method: 'DELETE'
        })
        result = await result.json()
        getData()
    }

    function selectToUpdate(id) {
        setName(data[id - 1].name)
        setEmail(data[id - 1].email)
        setAge(data[id - 1].age)
        setUserId(data[id - 1].id)
    }

    async function updateData(e) {
        e.preventDefault()
        let item = { name, email, age, userId }

        let result = await fetch(`http://localhost:3000/list/${userId}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        result = await result.json()
        getData()
    }

    return (
        <div>
            <Header /><br />
            <h1>Welcome!</h1><br /><br />
            <div className='col-sm-10 offset-sm-1'>
                <h4 style={{ textDecoration: 'underline', color: 'purple' }}>***User Data***</h4><br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th colSpan='2'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                        <td><Button className='btn btn-secondary' onClick={() => deleteData(item.id)}>Delete</Button></td>
                                        <td><Button className='btn btn-secondary' onClick={() => selectToUpdate(item.id)}>Update</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div><br />
            <form className='col-sm-2 offset-sm-5'>
                <input className='form-control col-sm-2' type='text' value={name}
                    onChange={(e) => { setName(e.target.value) }} /><br />

                <input className='form-control col-sm-2' type='text' value={email}
                    onChange={(e) => { setEmail(e.target.value) }} /><br />

                <input className='form-control col-sm-2' type='text' value={age}
                    onChange={(e) => { setAge(e.target.value) }} /><br />

                <button onClick={updateData}>Update</button>
            </form>
        </div>
    )
}

export default Home