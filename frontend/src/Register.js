import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        nombre: '',
        correo: '',
        contra: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:8080/auth/register', values);
            alert("Registro exitoso. Ahora inicia sesión.");
            navigate('/');
        } catch (err) {
            console.error(err.response?.data || "Error desconocido"); // <-- Ver error en consola
            setError(err.response?.data?.message || "Error al registrar. Intenta con otro correo.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
             <div className='bg-white p-4 rounded w-25' 
             style={{ border: '3px solid #28ac6d', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>

                <div className="text-center mb-3">
                <img src="/ConCreditoIcono.png" alt="Logo" style={{ width: 'auto', height: '80px' }} />
                </div>

                <h2 className='text-center'>Registrarse</h2>
                {error && <p className="text-danger">{error}</p>}

                <form onSubmit={handleSubmit}>

                    <div className='mb-3'>
                        <label>Nombre:</label>
                        <input type="text" placeholder="Ingrese su nombre" name='nombre'
                            onChange={handleInput} className='form-control' />
                    </div>
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

                    <button type='submit' className='btn btn-success w-100'><strong>Registrarse</strong></button>
                    <p></p>
                    <p className='text-center'>¿Ya tienes cuenta?</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'>Iniciar Sesión</Link>

                </form>
            </div>
        </div>
    );
}

export default Register;
