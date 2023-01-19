

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import * as React from 'react'
import { useState } from 'react'
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './component/ItemDetailContainer/ItemDetailContainer';
import CollapsibleNavbar from './component/Navbar/Navbar';
import About from './component/about/about';
import { CartProvider } from './context/CartContext'
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import Footer from './component/Footer/Footer';
import Login from './component/Login/Login';
import app from './services/firebase/firebaseConfig';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Home from './component/Home/Home';


const auth=getAuth(app)

function App() {
  const [usuario, setUsuario] = useState(null)

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      setUsuario(usuarioFirebase)
    }
    else{
      setUsuario(null)
    }
  })
  return (
     <div className="App" >
      <CartProvider>
       <BrowserRouter>
        <CollapsibleNavbar/>
        <Routes>
          <Route path='/'element={<ItemListContainer/>}/>
          <Route path='/category/:categoryId' element={<ItemListContainer/>}/>
          <Route path='/detail/:productId' element={<ItemDetailContainer/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element ={<Checkout/>}/>
          <Route path="/login" element = {usuario ? <Home/> : <Login/>} />
        </Routes>
        <Footer/>
       </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
