import React, { useState, useEffect } from 'react'
import './TableList.css'
import axios from 'axios';

function TableList() {
    const [table, setTable] = useState([]);

    async function fetchTalbles() {
        const response = await axios.get('/diningTables');
        setTable(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        fetchTalbles();
    }, []);
    return (
        <>
            <div style={{ marginTop: '70px' }}>
                <table className="table-list" cellPadding="32">
                    <thead className="table-list">
                        <tr className="text-center">
                            <th>Table No</th>
                            <th>Capacity</th>
                            <th>Service</th>
                            <th>Location</th>
                            <th style={{ width: '250px' }}>User</th>
                            <th style={{ width: '250px' }}>Phone</th>
                            {/* <th style={{ width: '150px' }}>QR Code</th> */}
                            <th style={{ width: '150px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.tableNumber}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.tableService}</td>
                                    <td>{item.tableLocation}</td>
                                    <td>
                                    {item.occupiedBy?.fullName}
                                    </td>
                                    <td>
                                    {item.occupiedBy?.phone}
                                    </td>


                                    {/* <td><button></button></td> */}
                                    <td>
                                        <button className="mx-3 list-update-btn">
                                            <b>Update</b>
                                        </button>
                                        <button>
                                            <b>Delete</b>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableList