import React from 'react';
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height: '40vh',}}> 
      <Card className="justify-content-center">
        <Card.Body className="justify-content-around">
          <Card.Title >Sobre nosotros...</Card.Title>
              <p>Somos una empresa joven con lo mejor de la tecnologia</p>
              <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height: '10vh',}} >
                <Button className="justify-content-center"onClick={()=>navigate(-1)} variant="danger" >Volver a Home</Button>{' '}
              </div>
             
        </Card.Body>
      </Card> 
    </div>

  )
};
  
export default About;