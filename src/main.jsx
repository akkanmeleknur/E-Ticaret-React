import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
