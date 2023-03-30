import React, {useEffect, useState} from 'react'
import './ShowTableInfo.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ShowTableInfo() {
  const { id } = useParams();

  const [showInfo, setShowInfo] = useState()

  const showTableInformation = async () => {
    const data =  await axios.get(`/diningTable/${id}`);
    const apiData = data.data.data;
    setShowInfo(apiData);
  }

  useEffect(() => {
    showTableInformation();
  }, []);

  return (
    <>
    <h4 className='table-info-heading'>ShowTableInfo</h4>
    <div>
    tableNumber:{showInfo?.tableNumber} <br/>
    capacity : {showInfo?.capacity} <br/> 
    tableService : {showInfo?.tableService} <br/>
    tableLocation : {showInfo?.tableLocation}
    </div>
    </>
  )
}

export default ShowTableInfo