import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../../services/firebase/firebaseConfig';
const auth=getAuth(app)


const Login = ()=>{
    const [registro, setRegistro]=useState(false)

    const handlerSubmit = async(e)=>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
    
        if(registro){
            await createUserWithEmailAndPassword(auth, correo, contraseña)
        }
        else{
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }

return(

    <div >
    
    <Form onSubmit={handlerSubmit}>
        <h1>{registro? 'registrate' : 'Inicia sesion'} </h1>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingrese su email</Form.Label>
            <Form.Control placeholder="Enter email" type="email" name='email' required />
        </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' required/>
        </Form.Group>
            <Button variant="primary" type="submit" size="lg">
            {registro? 'registrate' : 'Inicia sesion'} 
            </Button> 
        <p>  </p>
        
        <div>
        <Button variant="secondary" onClick={()=> setRegistro(!registro)}>
            {registro
            ? 'Ya estas registrado? Inicia sesion' 
            : 'No estas registrado?, registrate' }
        </Button>{' '}
        </div>
            
            
     </Form>
  </div>

)
}

export default Login 