import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import Header from "./Header";

function SearchData() {
    const [data, setData] = useState([])

    async function search(key) {
        let result = await fetch(`http://localhost:3000/search/${key}`)
        result = await result.json()
        console.log(result)
        setData(result)
        console.log(result)
    }

    return (
        <div>
            <Header /><br />
            <div className="col-sm-8 offset-sm-2">
                <h1>Search Data here...</h1><br />
                <input type='text' className='form-control' placeholder='Search data' onChange={(e) => { search(e.target.value) }} /><br />
                {
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
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
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default SearchData