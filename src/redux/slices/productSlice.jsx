import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = "https://fakestoreapi.com";

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    filteredProducts: [], // Filtrelenmiş ürünler
    searchQuery: '', // Arama için kullanılacak değer
}

export const getAllProducts = createAsyncThunk("getAllProducts",
    async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    })

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload; // Arama değerini güncelle
            state.filteredProducts = state.products.filter((product) =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload; //* Varsayılan olarak tüm ürünleri göster
            })

    }
})

export const { setSelectedProduct, setSearchQuery } = productSlice.actions

export default productSlice.reducer