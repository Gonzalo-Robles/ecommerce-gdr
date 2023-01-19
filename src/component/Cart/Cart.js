import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const Cart = () => {
    const { cart, removeItem, getTotal } = useContext(CartContext)
    
    return (

        <div >
            <h2>Carrito</h2>
            {
                cart.map(product=> {
                    return (
                      
                        <div key={product.id} >
                          
                            <Table striped >
                            
                              <thead width="33%" height="60">
                                <tr >
          
                                  <th >Item</th>
                                  <th>Precio</th>
                                  <th>Cantidad</th>
                                  <th>SubTotal</th>
                                  <th>Quitar</th>
                                </tr>
                              </thead>
                              <tbody width="33%" height="60"> 
                                <tr>     
                                  <td  >{product.name} </td>
                                  <td> ${product.price}</td>
                                  <td> {product.quantity}</td>
                                  <td> ${product.price * product.quantity}</td>
                                  <th> <div onClick={() => removeItem(product.id)}><img src={'./images/cesto.svg'} alt='cesto-basura' width='30'/></div> </th>
                                </tr>
                              </tbody>
                            </Table>
                        </div>
                    )
                })
            }
            {getTotal() <=0 ? (
       
       <div class="justify-content-center">
          <h3> Carro vacío</h3>
          <Link to="/"><Button>Agregar productos</Button></Link>
        </div>
        ) : (
        <>
          <div >
            <div>
              Total: ${getTotal()}
            </div>
            <br></br>
            <Link to="/Checkout"><Button>Terminar orden</Button></Link>
          </div>
        </>
      )}
 </div>
     
    )

}
export default Cart