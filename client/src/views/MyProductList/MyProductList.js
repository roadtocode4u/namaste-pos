import React from 'react'

import './MyProductList.css'
import { myProductListItems } from './../../utils/myListItem.js'
import deleteIcon from './../MyProductList/delete-icon.png';

function MyProductList() {
    return (
        <>
            <div className='row'>
                <h1 className='text-center heading mb-5'>🍽 MyList</h1>
                {
                    myProductListItems.map((item, index) => {
                        return (
                            <div key={index} className='product-card'>
                                <h4>{item.name}</h4>
                                <b>Quantity: {item.quantity}</b> <br/>
                                <b className='mb-2 product-card-price'>₹{item.price}</b>
                                <img className='deleteIcon' src={deleteIcon} />
                                <img className='product-img' src={item.imgUrl} />
                            </div>
                        )
                    })
                }
                <div className='text-center'>
                    <button className='btn btn-success confirm-btn'><b>Confirm Orders</b></button>
                </div>
            </div>
        </>
    )
}

export default MyProductList