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

app.listen(8080, () => {
  console.log("jalando en el puerto 8080")
});