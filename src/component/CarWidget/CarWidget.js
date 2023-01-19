import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';


const CartWidget = () => {
    const {getQuantity}=useContext(CartContext)
    const totalQuantity=getQuantity()
   
    return( 
        <div style={{display: 'flex',  justifyContent:'center'}}>
            <img src={'./images/shoppingcart.svg'} alt='cart-widget' width='30'/>
            <div  style={{display: 'flex',  justifyContent:'center'}}>
                {totalQuantity}
            </div> 
        </div>
        )
       
}

export default CartWidget