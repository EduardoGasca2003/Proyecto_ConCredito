import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if(validationErrors.email === "" && validationErrors.password === ""){
            axios.post('http://localhost:8080/login', values)
            .then(res => { 
                if(res.data.token){
                    // Se guarda el token en LocalStorage
                    localStorage.setItem("token", res.data.token);
                    navigate('/home');
                }else{
                    alert("Usuario no encontrado");
                }
            })    
            .catch(err => console.log(err));
        }
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