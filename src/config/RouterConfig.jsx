import React from 'react'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import ProductDetailPage from '../pages/ProductDetailPage'

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='product/:id' element={<ProductDetailPage />} />
            </Routes>
        </div>

    )
}

export default RouterConfig