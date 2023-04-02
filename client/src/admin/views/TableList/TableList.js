import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';
import swal from 'sweetalert';

import Loader from './../../../components/Loader/Loader';
import qrCodeImage from './qr-code.png';
import './../../../style/button.css'
import './TableList.css';

function TableList() {
  const [table, setTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteTable = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you wanted to delete this Table?!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setIsLoading(true);
        const response = await axios.delete(`/diningTable/${id}`);
        console.log(response);
        if (response.data.success) {
          await swal({
            title: 'Deleted Successfully !!',
            text: response.data.message,
            icon: 'success',
            button: 'Okay',
          });
          fetchTalbles();
        }
        setIsLoading(false);
      }
    });
  };

  async function fetchTalbles() {
    setIsLoading(true);
    const response = await axios.get('/diningTables');
    setTable(response.data.data);
    setIsLoading(false);
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
      <h4 className="text-center table-list-heading">Table List</h4>
      <div style={{ marginTop: '40px' }}>
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
                  <td>{item.occupiedBy?.fullName}</td>
                  <td>{item.occupiedBy?.phone}</td>

                  <td>
                    <div
                      className="text-center list-qr-code-btn"
                      onClick={() => {
                        generateQRCode(item.tableNumber);
                      }}>
                      <img src={qrCodeImage} />
                    </div>
                  </td>
                  <td>
                    <Link to={`/admin/addTable/${item._id}`}>
                      <button className="mx-3 list-update-btn">
                        <b>Update</b>
                      </button>
                    </Link>
                    <button
                      className="list-delete-btn"
                      onClick={() => {
                        deleteTable(item._id);
                      }}>
                      <b>Delete</b>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Loader isLoading={isLoading} />
      </div>
    </>
  );
}

export default TableList;
