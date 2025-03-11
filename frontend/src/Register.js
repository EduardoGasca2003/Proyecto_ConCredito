import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Validation from './RegisterValidation';
import axios from 'axios';

function Register() {

    const [values, setValues] = useState({
        name: '',
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
        if(errors.name === '' && errors.email === '' && errors.password === ''){
            axios.post('http://localhost:3001/register', values)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }

        
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h2>Registrarse</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label>Nombre:</label>
                        <input type="text" placeholder="Enter Nombre" name = 'name'
                        className='form-control'/>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label>Correo electronico:</label>
                        <input type="email" placeholder="Enter Email" name='email'
                        className='form-control'/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label>Contraseña:</label>
                        <input type="password" placeholder="Enter Contraseña" name='password'
                        className='form-control' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Registrarse</strong></button>
                    <p>¿No tienes cuenta?</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'>Iniciar Sesion</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;    