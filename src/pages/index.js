import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Image from 'next/image'

function App() {

  useEffect( () => {

    const isAuthenticated = localStorage.getItem("GuessMTG@token")

    if (!isAuthenticated) { 
      window.location = "/signup"
    } else {
      window.location = "/wordle"
    }

  }, [])

  return <></>
}

export default App;
