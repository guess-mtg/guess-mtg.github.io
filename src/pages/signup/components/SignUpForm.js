import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import { Container, Col, Row } from 'react-bootstrap'
import { authenticate, createUser } from '../../../src/services/api';


function LoginForm() {
    const [ showSuccess , setShowSuccess] = useState(false);
    const [ showError , setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault() 

        const { username, password } = e.target.elements

        const payload = { 
            "username": username.value,
            "password": btoa(password.value)
        }
        
        authenticate(payload)
            .then( (result) => {
                if (result.access_token) {
                    setShowError(false)
                    setShowSuccess(true)
                    setTimeout( () => {
                        window.location = "/wordle"
                    }, 500)
                } else {
                    setShowSuccess(false)
                    setShowError(JSON.stringify(result))
                }
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Alert key="success" variant="success" show={showSuccess} className="small">
                Login realizado com sucesso! Redirecionando...
            </Alert>
            <Alert key="danger" variant="danger" show={showError} className="small">
                Usuário e/ou senha incorretos
            </Alert>            
            <Form.Group as={Row} className="mb-3">
                <Form.Label column xs="3">
                    Email
                </Form.Label>
                <Col xs="9">
                    <Form.Control type="email" name="username" placeholder="Enter email"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" name="password">
                <Form.Label column xs="3">
                    Password
                </Form.Label>
                <Col xs="9">
                    <Form.Control type="password" name="password" placeholder="Password"/>
                </Col>        
            </Form.Group>
            
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

function RegisterForm() {
    const [ showSuccess , setShowSuccess] = useState(false)
    const [ showError , setShowError] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()  

        const { 
            email,
            username, 
            name, 
            password,
            confirmPassword
        } = e.target.elements
        
        if (confirmPassword.value === password.value) { 
            const payload = { 
                "email": email.value, 
                "username": username.value, 
                "full_name": name.value, 
                "password": btoa(password.value, "base64")
            } 

            createUser(payload)
                .then( (result) => {
                    if (result === true) {
                        setShowError(false)
                        setShowSuccess(true)
                    } else {
                        setErrorMessage(result.msg ? result.msg : result.detail)
                        setShowSuccess(false)
                        setShowError(true)
                    }
                })  
        } else {
            setErrorMessage("Passwords don't match")
            setShowSuccess(false)
            setShowError(true)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Alert key="success" variant="success" show={showSuccess} className="small">
                Cadastro efetuado com sucesso!
            </Alert>
            <Alert key="danger" variant="danger" show={showError} className="small">
                { errorMessage }
            </Alert>      
            <Form.Group as={Row} className="mb-3">
                <Form.Label column xs="3">
                    Email
                </Form.Label>
                <Col xs="9">
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column xs="3">
                    Name
                </Form.Label>
                <Col xs="9">
                    <Form.Control type="text" name="name" placeholder="Enter full name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column xs="3">
                    Username
                </Form.Label>
                <Col xs="9">
                    <Form.Control type="text" name="username" placeholder="Enter username" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
            <Form.Label column xs="3">
                Password
            </Form.Label>
            <Col xs="9">
                <Form.Control type="password" placeholder="Password" name="password" className='mb-2' />
                <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" className='mb-2' />
            </Col>        
            </Form.Group>
            
            <Button variant="secondary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

function SignUpForm() {

 
  return (
    <Container fluid className='signup-form-container'>
        <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="signup-tabs"
        fill
        >
        <Tab eventKey="login" title="Login" tabClassName='text-warning' className="signup-tab-pane">
            <LoginForm />
        </Tab>
        <Tab eventKey="register" title="Register" tabClassName='text-warning' className="signup-tab-pane">
            <RegisterForm />
        </Tab>
        </Tabs>
    </Container>
  );
}

export default SignUpForm;
