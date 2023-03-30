import React, { useState, useEffect } from 'react';
import './Tables.css';
import axios from 'axios';
import QRCode from 'qrcode';
import AvailableTable from './table.png';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import Loader from './../../../components/Loader/Loader';

const Tables = () => {
  const [table, setTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteProduct(id) {
    if (
      window.confirm('Are you sure that you wanted to delete this product?')
    ) {
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
      }
    }
    location.reload();
    setIsLoading(false);
  }

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
    const link = `http://localhost:5000/bookTable/${tableNumber}`;
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
      <div className="container">
        <div className="row text-center">
          {table?.map((table, index) => {
            return (
              <div
                key={index}
                className={`col-md-3 tableCard ${table.occupied && 'bg-red'}`}>
                <p className="tableNumber">
                  <b>Table Number - {table.tableNumber}</b>
                </p>
                <div className="table-img-btn">
                  <img src={AvailableTable} className="table" alt="random" />
                  <br></br>
                  <button
                    className="text-center qr-code-btn"
                    onClick={() => {
                      generateQRCode(table.tableNumber);
                    }}>
                    QR Code
                  </button>
                </div>

                <div className="btn-update-table-delete">
                  <Link to={`/admin/addTable/${table._id}`}>
                    <button className="mx-3 list-update-btn">
                      <b>Update</b>
                    </button>
                  </Link>
                  <button
                    className="btn-delete-table"
                    onClick={() => {
                      deleteProduct(table._id);
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Loader isLoading={isLoading} />
      </div>
    </>
  );
};

export default Tables;
