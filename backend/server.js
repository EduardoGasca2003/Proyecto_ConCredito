const express = require("express");
const mysql = require('mysql'); 
const cors = require('cors');   
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tareas",
});

app.post('/register', (req, res) => {
  const sql = "INSERT INTO usuarios (`nombre`, `correo`, `contra`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.password];
  
  db.query(sql, values, (err, result) => {
      if(err){
          return res.json("Error");
      }else{
          return res.json(result);
      }
  });
  
});

app.post('/login', (req, res) => {

  console.log("Solicitud recibida en /login");
  console.log(req.body);

  const sql = "select * from usuarios where correo = ? and contra = ?";
  
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if(err){
          return res.json("Error al iniciar sesion");
      }if(result.length > 0){
          // ✔ Si encontró el usuario, creamos el token
      const user = result[0];
      const token = jwt.sign(
        { id: user.id, email: user.correo },
        "clave_secreta", // 🔥 Esta clave será tu firma (puedes cambiarla)
        { expiresIn: '1h' } // El token expirará en 1 hora
      );

      // Devolvemos el token al cliente
      return res.json({ token });
    } else {
      return res.json("Usuario no encontrado");
    }
  }); 
});

app.get('/home', (req, res) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status(401).json("No autorizado");
  }

  jwt.verify(token, "clave_secreta", (err, decoded) => {
    if(err) {
      return res.status(401).json("Token inválido");
    }
    return res.json("Bienvenido a la página de tareas");
  });
});


app.listen(8080, () => {
  console.log("jalando en el puerto 8080")
});