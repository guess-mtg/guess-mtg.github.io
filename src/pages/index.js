import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image'
import { redirect } from 'next/dist/server/api-utils';

function App() {

  useEffect( () => {

    const isAuthenticated = localStorage.getItem("GuessMTG@token")
    console.log(isAuthenticated)

    if (!isAuthenticated) { 
      window.location = "/signup"
    } else {
      window.location = "/wordle"
    }

  }, [])

  return (
    <Container fluid>
      <div className="d-flex">
        <Image src='/assets/logo.jpg' alt='GuessMTG logo' height={80} width={100}/> 
        <span className='pt-3 small text-light'>beta</span>
      </div>
    </Container>
    
  );
}

export default App;
