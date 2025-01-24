import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../App.css';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';



function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams(); // URL'den alınan id
    const { products, selectedProduct } = useSelector((store) => store.product);
    const { title, price, description, category, image } = selectedProduct;

    const [amount, setAmount] = useState(1);
    const arttır = () => {
        if (amount < 5) {
            setAmount((amount + 1));
        }
    }

    const azalt = () => {
        if (amount > 1) {
            setAmount((amount - 1));
        }
    }

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    };

    useEffect(() => {
        getProductById();
    }, []);

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            amount
        }

        dispatch(addToBasket(payload));
        dispatch(calculateBasket())
    }

    return (
        <div style={{ fontFamily: 'arial' }}>
            <h1>Product Detail</h1>

            <div className="flex-row" style={{ margin: 20 }}>
                <div style={{ padding: 20 }}>
                    <img src={image} alt="Product" className="img" style={{ height: 400, width: 340 }} />
                </div>
                <div style={{ padding: 20 }}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>Category: {category}</p>
                    <p style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Price: {price} ₺</p>

                    <div className='flex-row' style={{ justifyContent: 'flex-start' }}>
                        <CiCirclePlus size={30} onClick={arttır} style={{ cursor: 'pointer' }} />
                        <span style={{ fontSize: 20, marginInline: 10 }} > {amount}</span>
                        <CiCircleMinus size={30} onClick={azalt} style={{ cursor: 'pointer' }} />
                    </div>

                    <div style={{ paddingTop: 20 }}>
                        <button onClick={addBasket} style={{ backgroundColor: 'gold', padding: 7, border: 'none', borderRadius: 5, cursor: 'pointer' }}>
                            Sepete Ekle
                        </button>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default ProductDetail;
