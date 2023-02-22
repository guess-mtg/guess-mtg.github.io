// components/layout.js
import React, { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { IoAdd, IoInformationCircleOutline, IoCloseOutline, IoLogOut } from 'react-icons/io5';
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'

const Header = ({ toggleInfo, toggleMenu, isMenuOpen, isInfoOpen, componentName }) => {

    const handleLogout = () => {
        localStorage.removeItem("GuessMTG@token")
        window.location = "/signup"
    }

    return (
        <Row className="w-100">
            <Col>
                <div className="header w-100 d-flex justify-content-between align-items-center border-bottom mb-3">
                    <div className="d-flex">
                        <Image src='/assets/logo.jpg' alt='GuessMTG logo' height={80} width={100}/> 
                        <span className='pt-3 small text-light'>beta</span>
                    </div>
                    { 
                        componentName !== "SignUp" &&
                        <div>
                            <Button onClick={ () => toggleInfo(!isInfoOpen) } variant='link'>
                                <IoInformationCircleOutline color="#eee" size={40} />
                            </Button>
                            <Button onClick={ () => toggleMenu(!isMenuOpen)} variant="link">
                                { isMenuOpen ? 
                                <IoCloseOutline color="#eee" size={40} /> :
                                <IoAdd color="#eee" size={40} /> 
                                }
                            </Button>
                            <Button onClick={handleLogout} variant="link">
                                <IoLogOut color="#eee" size={40} />
                            </Button>
                        </div>
                    }
                    
                </div>
            </Col>
        </Row>
    )
}

const Footer = () => {
    return (
        <Row>
            <Col>
            <footer>
                <span>Unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</span>
            </footer>
            </Col>
        </Row>
        
    )
}

const InfoModal = ({ toggleInfo, isInfoOpen }) => {    
    return (
        <Modal show={isInfoOpen} onHide={() => toggleInfo(false)} size='lg'>
          <Modal.Header closeButton>
          <Modal.Title>GuessMTG - Guess the card!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>For each card you'll have 10 guesses</p>
            <p> The color of the tiles will change to show how close your guess was to the word.</p>
            <p>Examples:</p>
            <section className='d-flex'>
              {
                'TWO WORDS'.split('').map( (letter, index) => {
                  if (index === 0) {
                    return <div key={index} className='letter-space' score='1'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div  key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div  key={index} className='letter-space'>{letter}</div>
                })
              }
            </section>
            <p>
              The letter <strong>T</strong> is in the word and in the correct spot.
            </p>
            <section className='d-flex'>
              {
                'OTHER WORDS'.split('').map( (letter, index) => {
                  if (index === 9) {
                    return <div key={index} className='letter-space' score='0'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div key={index} className='letter-space'>{letter}</div>
                })
              }
            </section>
            <p>
              The letter <strong>D</strong> is in the words, but in the incorrect spot.
            </p>
            <section className='d-flex'>
              {
                'LAST TWO'.split('').map( (letter, index) => {
                  if (index === 2) {
                    return <div key={index} className='letter-space' score='-1'>{letter}</div>
                  }
                  if (letter === " ") {
                    return <div key={index} className='blank-space info'>{letter}</div>
                  }
                  return <div key={index} className='letter-space'>{letter}</div>
                })
              }
            </section>
            <p>
              The letter <strong>S</strong> is not in the words.
            </p>
          </Modal.Body>
        </Modal>
    )
}

const Menu = ({ isMenuOpen }) => {
    return (
              
        <menu className={ isMenuOpen ? 'sidebar show' : 'sidebar' }>
          <p>
            Looking for parterships? Contact us <strong>contact@guessmtg.com</strong>
          </p>
          <p>
            Want more games and challenges? <br/> Follow @<a className="menu-link" href="https://instagram.com/guessmtg" target="_blank" rel='noopener'>GuessMTG</a>    on Instagram.
          </p>

        <a title="GDPR-compliant Web Analytics" href="https://clicky.com/101389362"><img alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" /></a>
        <script async src="//static.getclicky.com/101389362.js"></script>
        <noscript><p><img alt="Clicky" width="1" height="1" src="//in.getclicky.com/101389362ns.gif" /></p></noscript>
        </menu>

    )
}

export default function Layout({ children, componentName }) {
    const [ isInfoOpen, toggleInfo ] = useState(false)
    const [ isMenuOpen, toggleMenu ] = useState(false)

    return (
        <Container fluid className='App'>
            <Header componentName={componentName} toggleMenu={toggleMenu} toggleInfo={toggleInfo} isMenuOpen={isMenuOpen} />                
            <main className='main-container'>{children}</main>
            <Footer />
            <Menu isMenuOpen={isMenuOpen}/>
            <InfoModal isInfoOpen={isInfoOpen} toggleInfo={toggleInfo} />
        </Container>
    )
}