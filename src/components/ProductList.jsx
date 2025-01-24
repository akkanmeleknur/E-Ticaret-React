import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product.jsx';
import '../App.css'

function ProductList() {
    const dispatch = useDispatch();
    const { filteredProducts } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (

        <div>
            <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: 25 }}>
                {filteredProducts &&
                    filteredProducts.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
            </div>
        </div>
    );
}

export default ProductList;
