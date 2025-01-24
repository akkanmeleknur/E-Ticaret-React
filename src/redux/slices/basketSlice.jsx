import { createSlice } from '@reduxjs/toolkit'


export const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"))
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    total: 0
}

export const writeFormBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                //daha önce eklendiyse
                console.log("daha önce ekledin")
                const extractedProducts = state.products && state.products.filter((product) => product.id != action.payload.id)
                findProduct.amount += action.payload.amount;
                state.products = [...extractedProducts, findProduct];
                writeFormBasketToStorage(state.products)
            }
            else {
                state.products = [...state.products, action.payload];
                writeFormBasketToStorage(state.products);
            }

        },

        removeFromBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                // Ürün varsa miktarı azalt veya tamamen kaldır
                const updatedProducts = state.products.filter((product) => product.id !== action.payload.id);

                if (findProduct.amount > 1) {
                    // Eğer miktar 1'den büyükse azalt ve güncelle
                    findProduct.amount -= 1;
                    state.products = [...updatedProducts, findProduct];
                } else {
                    // Miktar 1 ise tamamen kaldır
                    state.products = updatedProducts;
                }

                // Güncellenmiş ürün sepetini sakla
                writeFormBasketToStorage(state.products);
            }
        },

        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },

        calculateBasket: (state) => {
            state.total = 0;
            state.products && state.products.map((product) => {
                state.total += (product.amount * product.price)
            })
        }




    }
})

export const { addToBasket, removeFromBasket, setDrawer, calculateBasket } = basketSlice.actions

export default basketSlice.reducer