import { useState } from 'react'
import './App.css'
import {Navbar} from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import {Cart} from './pages/Cart/Cart'
import {PlaceOrder} from './pages/PlaceOrder/PlaceOrder'
import { Footer } from './components/Footer/Footer'
import { LoginPopup } from './components/LoginPopup/LoginPopup'
import { Verify } from './pages/Verify/Verify'
import OrderSuccess from './components/OrderSuccessFulPage/OrderSuccessful'
import { MyOrders } from './pages/MyOrders/MyOrders'


function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {
        showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>
      }
      <Navbar setShowLogin={setShowLogin}/>
      <div className='app-content'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order' element={<PlaceOrder />}/>
          <Route path='/verify/:orderId/:success' element={<Verify />}/>
          <Route path='/placed' element={<OrderSuccess />}/>
          <Route path='/myorder' element={<MyOrders />}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
