import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {useState} from 'react'
import {useNavigate} from "react-router-dom"


const ItemCount = ( {stock, onAdd})=>{
    const[count, setCount]= useState(0)
    const navigate = useNavigate();
    const decrement=()=>{
        if(count>=1){
            setCount(prev => prev - 1)
        }
    }

    const increment=()=>{
        if(count < stock){
            setCount(prev => prev + 1)
        }
        
    }
    return (
        <div >
            <h3>cantidad {count}</h3>
            <div style={{display: 'flex',alignItems: 'center'}}  >
            <ButtonToolbar aria-label="Toolbar with button groups" className="justify-content-around">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button onClick={decrement}>-</Button> 
                    <Button onClick={increment}>+</Button> 
                <Button onClick={()=> onAdd(count)} disabled={count<1}>Agregar producto</Button>
            </ButtonGroup>
            </ButtonToolbar>
            </div>
            <br></br>
            <Button className="justify-content-center"onClick={()=>navigate(-1)}  > Atras </Button>{' '}
        </div>
        
    )
}

export default ItemCount