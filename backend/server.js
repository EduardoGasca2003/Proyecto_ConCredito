const express = require("express");
const mysql = require('mysql'); 
const cors = require('cors');   

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
          return res.json("Success");
      }else{
          return res.json("Error");
      }
  });
  
});

app.listen(8080, () => {
  console.log("jalando en el puerto 8080")
});