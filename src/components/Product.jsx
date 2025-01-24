import React from 'react'
import '../css/product.css'
import { Outlet, useNavigate } from 'react-router-dom';

function Product({ product }) {

    const { id, title, price, image } = product;

    const navigate = useNavigate();

    return (
        <div>
            <div className='card' style={{ fontFamily: 'arial', fontSize: 12 }}>
                <img src={image} className='img' />
                <div>
                    <p style={{ textAlign: 'center', height: 50 }}>{title}</p>
                    <h3 style={{ textAlign: 'center' }}>Price: {price} ₺</h3>
                </div>
                <div>
                    <button className='detail-button' onClick={() => { navigate('/product/' + id) }}>Detayına Git</button>
                </div>

            </div>


        </div>
    )
}

export default Product