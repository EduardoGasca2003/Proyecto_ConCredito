function Validation(values){
 
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //If para validar el nombre
    if(values.name === ''){
        error.name = 'El correo es requerido'
    }else{
        error.name = ''
    }
    
    //If para validar correo
    if(values.email === ''){
        error.email = 'El correo es requerido'
    }else if(!email_pattern.test(values.email)){
        error.email = 'El correo no es valido'
    }else{
        error.email = ''
    }

    //If para validar contraseña
    if(values.password === ''){
        error.password = 'La contraseña es requerida'
    }else if(!password_pattern.test(values.password)){
        error.password = 'Contraseña incorrecta'
    }else{
        error.password = ''
    }
    
    return error;
}

export default Validation;