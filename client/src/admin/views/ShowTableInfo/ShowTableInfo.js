import React, { useEffect, useState } from 'react';
import './ShowTableInfo.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import tableNumberImage from './images/img-table.png';
import tableCapacityImage from './images/img-capacity.png';
import tableServiceImage from './images/img-service.png';
import tableLocationImage from './images/img-location.png';
import tableUserImage from './images/img-user.png';
import tablePhoneImage from './images/img-phone.png';

function ShowTableInfo() {
  const { id } = useParams();

  const [showInfo, setShowInfo] = useState();

  const showTableInformation = async () => {
    const data = await axios.get(`/diningTable/${id}`);
    const apiData = data.data.data;
    console.log(apiData);
    setShowInfo(apiData);
  };

  useEffect(() => {
    showTableInformation();
  }, []);

  return (
    <>
      <h4 className="table-info-heading">ShowTableInfo</h4>
      <div className="show-info-table-card">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="table-main-div">
              <div className="table-data text-center m-2">
                <img src={tableNumberImage} className="show-info-images mb-3" />{' '}
                <br />
                Table Number :{showInfo?.tableNumber}
              </div>

              <div className="table-data text-center m-2">
                <img
                  src={tableServiceImage}
                  className="show-info-images mb-3"
                />{' '}
                <br />
                Table Service : {showInfo?.tableService}
              </div>
            </div>

            <div className="table-data text-center m-2">
              <img src={tableUserImage} className="show-info-images mb-3" />{' '}
              <br />
              User Name : {showInfo?.occupiedBy.fullName}
            </div>
          </div>
          <div className="col-md-6">
            <div className="table-main-div">
              <div className="table-data text-center m-2">
                <img
                  src={tableCapacityImage}
                  className="show-info-images mb-3"
                />{' '}
                <br />
                capacity : {showInfo?.capacity}
              </div>

              <div className="table-data text-center m-2">
                <img
                  src={tableLocationImage}
                  className="show-info-images mb-3"
                />{' '}
                <br />
                Table Location : {showInfo?.tableLocation}
              </div>

              <div className="table-data text-center m-2">
                <img src={tablePhoneImage} className="show-info-images mb-3" />{' '}
                <br />
                User Phone : {showInfo?.occupiedBy.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTableInfo;
