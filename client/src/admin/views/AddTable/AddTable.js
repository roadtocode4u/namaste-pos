import React, { useState } from 'react';
import axios from 'axios';

import swal from 'sweetalert';
import addTableImg from './../../images/addTable.png';
import './AddTable.css';
import './../../../style/button.css'

function AddTable() {
  const [tableNumber, setTableNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [tableLocation, setTableLocation] = useState('');
  const [tableService, setTableService] = useState('');

  async function addTable() {
    if (!tableNumber || !capacity || !tableLocation || !tableService) {
      await swal({
        title: 'Please fill all the fields',
        text: response.data.message,
        icon: 'error',
        button: '😥',
      });
      return;
    }
    const response = await axios.post('/createDiningTable', {
      tableNumber,
      capacity,
      tableLocation,
      tableService,
    });

    if (response.data.success) {
      await swal({
        title: 'Table Added Successfully!!',
        text: response.data.message,
        icon: 'success',
        button: 'Aww yiss!',
      });
    } else {
      swal(response.data.message);
    }

    setTableNumber('');
    setCapacity('');
    setTableLocation('');
    setTableService('');
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center add-tableheading">Add Table </h4>
        <div className="main-card-div text-center">
          <div className="row">
            <div className="col-md-5 mx-auto d-block">
              <img src={addTableImg} className="add-product-img" />
            </div>
            <div className="col-md-7">
              <form>
                <div className="mb-4 mt-2">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="tableNumber"
                    placeholder="Table Number"
                    value={tableNumber}
                    onChange={(e) => {
                      setTableNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="capacity"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="tableLocation"
                    placeholder="Table Location"
                    value={tableLocation}
                    onChange={(e) => {
                      setTableLocation(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="tableService"
                    placeholder="Table Service"
                    value={tableService}
                    onChange={(e) => {
                      setTableService(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="button-add-material w-100 mb-4"
                  type="button"
                  onClick={addTable}>
                  <i className="fa-solid fa-right-to-bracket"></i>{' '}
                  <b>Add Table</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddTable;
