import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { MyStoreContextProvider } from './context API/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyStoreContextProvider>
        <App />      
      </MyStoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
