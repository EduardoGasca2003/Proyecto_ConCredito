import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values)); 
        console.log(values);
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
         <div className='bg-white p-4 rounded w-25'>
            <h2>Iniciar sesion</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label>Correo electronico:</label>
                    <input type="email" placeholder="Enter Email" name='email' 
                    onChange={handleInput} className='form-control'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label>Contraseña:</label>
                    <input type="password" placeholder="Enter Contraseña" name='password'
                    onChange={handleInput} className='form-control' />
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100'><strong>Iniciar sesion</strong></button>
                <p>¿No tienes cuenta?</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light'>Registrarse</Link>
            </form>
        </div>
    </div>
  );
}

export default Login;