import React, { useState, useEffect } from 'react';
import './Tables.css';
import axios from 'axios';
import QRCode from 'qrcode';
import AvailableTable from './table.png';

const Tables = () => {
  const [table, setTable] = useState([]);

  async function fetchTalbles() {
    console.log('fetching all tables');
    const response = await axios.get('/diningTables');
    console.log(response.data.data);
    setTable(response.data.data);
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
                  Table Number - {table.tableNumber}
                </p>
                <img src={AvailableTable} className="table" alt="random" />
                <br></br>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    generateQRCode(table.tableNumber);
                  }}>
                  QR Code
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tables;
