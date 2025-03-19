import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/howitworks/Home'
import Cart from './pages/cart/Cart'
import Placeloan from './pages/placeloan/Placeloan'
import Footer from './components/footer/Footer'
import Loginpopup from './components/loginpopup/Loginpopup'
import MchamaGroupSavings from './pages/groupsavings/Mchama'
import About from './components/aboutus/About'
import Mchama from './pages/groupsavings/Mchama'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Order from './pages/orders/Order'

const App = () => {

const [showLogin,setShowLogin] = useState(false)


  return (
    <>
    {showLogin?<Loginpopup  setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/mchama' element={<Mchama/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Loginpopup/>}/>

      </Routes>


    </div>
    <Footer/>
    </>
  )
}

export default App