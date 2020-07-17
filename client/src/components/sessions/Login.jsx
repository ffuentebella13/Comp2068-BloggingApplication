import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Form, Container, Button } from 'react-bootstrap';

const Login = props => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    
    const handleSubmit = async event => {
        event.preventDefault();

        const resp = await Axios.post('/authenticate', 
        inputs);
        console.log(resp);
    };

    const handleInputChange = event => {
        event.persist();

        const {name, value} = event.target;
        setInputs(inputs => ({
            ...inputs,
            [name]: value 
        }));
        console.log(inputs);
    };


    return (
        <Container className="my-5">
        <header>
            <h1>Register New User</h1>
        </header>
        <hr/>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <label htmlFor="email">Email: </label>
                    <Form.Control type="email" name="email" onChange={handleInputChange} value={inputs.email}/>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="password">Password: </label>
                    <Form.Control type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
                </Form.Group>
                <Form.Group>
                    <button className="btn btn-dark">Login</button>
                </Form.Group>
            </Form>

    </Container>
    );
};

export default Login;