import { useContext } from 'react'
import ItemCount from '../ItemCount/itemCount'
import { CartContext } from '../../context/CartContext'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap'
import Container from "react-bootstrap/esm/Container";
import { Link } from 'react-router-dom'
const ItemDetail=({id, name, img, description, price, stock})=>{
    
    const {addItem, isInCart} =useContext(CartContext)
    
    
    const handleOnAdd = (quantity) => {
        console.log("Se agrego "+ quantity);
        addItem({id,name, price, quantity})
    
    }
    
    return(
        <div  style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height: '120vh',}} >
           <Container  >
           <Row className="justify-content-around">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <div style={{alignItems: 'center',justifyContent: 'center',height: 'auto',}}>
                            <h1 >{name}</h1>
                            <img src={img} alt={name} style={{width:350}}/>
                            <p> {description}</p>
                            <h2>${price}</h2>
                            <p>Disponibles:{stock}</p>
                        </div>
                        {isInCart (id)  
                        ? <Link to='/Cart'><Button> Terminar compra </Button></Link> 
                        : stock > 0 
                        ? <ItemCount stock={stock} onAdd={handleOnAdd}/>
                        : <h1> Sin stock </h1>}
                    </Card.Body>
                </Card>
            </Row>
        <br></br>  
        </Container>
        </div>
    
    )
}

export default ItemDetail