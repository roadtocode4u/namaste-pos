import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import addTableImg from './addTable.png';
import Loader from '../../../components/Loader/Loader';

function UpdateAddTable() {
  const { id } = useParams();

  const [addTable, setAddTable] = useState({
    tableNumber: '',
    capacity: '',
    tableLocation: '',
    tableService: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAddTable() {
      setIsLoading(true);
      const { data } = await axios.get(`/diningTable/${id}`);
      const apiData = data?.data;
      setIsLoading(false);

      setAddTable({
        ...addTable,
        tableNumber: apiData?.tableNumber,
        capacity: apiData?.capacity,
        tableLocation: apiData?.tableLocation,
        tableService: apiData?.tableService,
      });
    }
    getAddTable();
  }, []);

  async function UpdateAddTable() {
    setIsLoading(true);
    const response = await axios.put(`/diningTable/${id}`, addTable);
    setIsLoading(false);
    console.log(response);
    if (response.status === 200) {
      swal({
        title: 'Update Successfully !!',
        text: response.data.message,
        icon: 'success',
        button: 'Aww yiss!',
      });
      window.location.href = '/admin/tables';
    }
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center heading">Update Table </h4>
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
                    value={addTable.tableNumber}
                    onChange={(e) => {
                      setAddTable({ ...addTable, tableNumber: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="capacity"
                    placeholder="Capacity"
                    value={addTable.capacity}
                    onChange={(e) => {
                      setAddTable({ ...addTable, capacity: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="tableLocation"
                    placeholder="Table Location"
                    value={addTable.tableLocation}
                    onChange={(e) => {
                      setAddTable({
                        ...addTable,
                        tableLocation: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="add-table-form-input"
                    id="tableService"
                    placeholder="Table Service"
                    value={addTable.tableService}
                    onChange={(e) => {
                      setAddTable({
                        ...addTable,
                        tableService: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  className="button-add-material w-100 mb-4"
                  type="button"
                  onClick={UpdateAddTable}>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <b> Update Table</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
}

export default UpdateAddTable;
