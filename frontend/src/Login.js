import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({ correo: '', contra: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:8080/auth/login', values);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.userName);
            navigate('/home');
        } catch (err) {
            setError("Credenciales incorrectas.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-4 rounded w-25'>
                <h2>Iniciar sesión</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label>Correo electrónico:</label>
                        <input type="email" placeholder="Ingrese su correo" name='correo'
                            onChange={handleInput} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label>Contraseña:</label>
                        <input type="password" placeholder="Ingrese su contraseña" name='contra'
                            onChange={handleInput} className='form-control' />
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Iniciar sesión</strong></button>
                    <p>¿No tienes cuenta?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-light'>Registrarse</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
