import React from 'react'
import './MyProductList.css'
function MyProductList() {
    return (
        <>
            <div>
                <h1 className='text-center heading mb-5'>🍽 MyList</h1>
                {
                    
                            <div className='product-card'>
                                <h4>name</h4>
                                <b>Quantity: </b> <b className='mb-2 product-card-price'>₹:200</b>
                                <img className='product-img' src='https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/cover-for-street-food-in-sydney.jpg' />
                            </div>
                 
                }
                <div className='text-center'>
                    <button className='btn btn-success confirm-btn'><b>Confirm Orders</b></button>
                </div>
            </div>
        </>
    )
}

export default MyProductList