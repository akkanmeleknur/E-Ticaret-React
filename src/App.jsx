import React, { useEffect } from 'react';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import './App.css';
import RouterConfig from './config/RouterConfig.jsx';
import Loading from './components/Loading.jsx';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer, removeFromBasket } from './redux/slices/basketSlice.jsx';

function App() {
  const { products, drawer, total } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [products]); // `products` değiştiğinde toplamı tekrar hesapla

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer open={drawer} onClose={() => dispatch(setDrawer())} anchor="right">
          {products &&
            products.map((product) => {
              return (
                <div key={product.id}>
                  <div
                    className="flex-row"
                    style={{
                      padding: 10,
                      margin: 10,
                      border: '1px solid lightgrey',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={product.image}
                      width={50}
                      height={50}
                      style={{ marginRight: 15 }}
                      alt={product.title}
                    />
                    <p style={{ width: 240, marginRight: 15, fontSize: 'small' }}>
                      {product.title}
                      <p>Sepette Bulunan: {product.amount} Adet</p>
                    </p>
                    <p style={{ fontWeight: 'bold', marginRight: 10, width: 150 }}>
                      {product.price} TL <span style={{ fontSize: 7 }}>(1 Adet Fiyatı)</span>
                    </p>
                    <button
                      style={{
                        padding: 5,
                        width: 40,
                        borderRadius: 5,
                        backgroundColor: 'orange',
                        border: 'none',
                        color: 'white',
                      }}
                      onClick={() => dispatch(removeFromBasket({ id: product.id }))}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              );
            })}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <h4>Toplam Fiyat: {total} TL</h4>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
