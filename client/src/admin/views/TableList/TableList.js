import React, { useState, useEffect } from 'react'
import './TableList.css'
import axios from 'axios';
import QRCode from 'qrcode';
import { Link } from 'react-router-dom';

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

    const generateQRCode = async (tableNumber) => {
        const link = `http://localhost:3000/bookTable/${tableNumber}`;
        try {
            console.log(await QRCode.toDataURL(link));
            // 1. Generate the QR code data URL
            const qrCodeDataURL = await QRCode.toDataURL(link);

            // 2. Create a new anchor element to hold the download link
            const downloadLink = document.createElement('a');

            // 3. Set the href attribute of the anchor element to the QR code data URL
            downloadLink.href = qrCodeDataURL;

            // 4. Set the download attribute of the anchor element to the desired file name
            downloadLink.download = `table_${tableNumber}_QRCode.png`;

            // 5. Add the anchor element to the DOM (hidden)
            document.body.appendChild(downloadLink);

            // 6. Programmatically trigger the click event on the anchor element
            downloadLink.click();

            // 7. Remove the anchor element from the DOM
            document.body.removeChild(downloadLink);
        } catch (err) {
            console.error(err);
        }
    };
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
                            <th style={{ width: '150px' }}>QR Code</th>
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


                                    <td>
                                        <button
                                            className="text-center qr-code-btn"
                                            onClick={() => {
                                                generateQRCode(item.tableNumber);
                                            }}>
                                            <b>QR Code</b>
                                        </button></td>
                                    <td>
                                        <Link to={`/admin/addTable/${item._id}`}>
                                            <button className="mx-3 btn-update-table">
                                                <b>Update</b>
                                            </button>
                                        </Link>
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