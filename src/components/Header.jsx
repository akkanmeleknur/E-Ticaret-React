import React from 'react'
import '../css/header.css'
import '../App.css'
import { IoSearch } from "react-icons/io5";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { useState } from 'react';
import logo from '../images/logo1.png'
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { setSearchQuery } from '../redux/slices/productSlice';

function Header() {

    const [theme, setTheme] = useState(false);

    const changeTheme = () => {
        const root = document.getElementById("root");
        setTheme(!theme);
        if (theme) {
            root.style.backgroundColor = "rgb(4, 1, 34)";
            root.style.color = "white"
        }
        else {
            root.style.backgroundColor = "white";
            root.style.color = "black"
        }
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector((store) => store.basket)

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <div className='flex-row' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img className="header-logo" src={logo} />
                <p className="header-logo-text">WONEL</p>
            </div>

            <div className='flex-row'>
                <input
                    type="text"
                    className="header-input"
                    placeholder="Bir şeyler ara"
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Arama terimini Redux'a gönder
                />
                <IoSearch style={{ marginRight: 30 }} className='icon' />

                <div>

                    {theme ? <FaMoon className='icon' onClick={changeTheme} style={{ paddingTop: 4, paddingRight: 4 }} /> : <FiSun className='icon' onClick={changeTheme} style={{ paddingTop: 4, paddingRight: 4 }} />}

                </div>

                <div onClick={() => dispatch(setDrawer())}>
                    <Badge badgeContent={products.length} color="error">
                        <RiShoppingBasketLine className='icon' />
                    </Badge>
                </div>

            </div>


        </div>
    )
}

export default Header