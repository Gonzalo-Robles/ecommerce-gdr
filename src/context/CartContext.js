import { useState, createContext } from 'react';

export const CartContext = createContext({ cart: [] })

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
          setCart([...cart, productToAdd])
        }
    }
  
    const isInCart = (id) => {
      return cart.some(product => product.id === id)
    }
  
    const getQuantity = () => {
      let sumaProductos = 0
  
      cart.forEach(prod => {
        sumaProductos += prod.quantity
      })
  
      return sumaProductos
    }

    const getTotal = () => {
      let sumaProductos = 0

      cart.forEach(prod => {
        sumaProductos += prod.quantity * prod.price
      })

      return sumaProductos
    }

    const removeItem = (id) => {
      const updatedCart = cart.filter(prod => prod.id !== id)

      setCart(updatedCart)
    }
    
    const clearCart = () => {
      setCart([])
    }
  
    console.log(cart)

    return (
        <CartContext.Provider value={{ cart, addItem, isInCart, getQuantity, getTotal, removeItem, clearCart }}>
            { children }
        </CartContext.Provider>
    )
}