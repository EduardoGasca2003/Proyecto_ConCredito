const express = require("express");
const mysql = require('mysql'); 
const cors = require('cors');   

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lista-tareas',
});

app.post('/register', (req, res) => {
    const sql = "insert into usuarios ('nombre', 'correo', 'contraseña') values ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.password+"')";
    const values = [req.body.name, req.body.email, req.body.password]
    db.query(sql, values, (err, result) => {
        if(err){
            return res.json("Error");
        }else{
            return res.json(data);
        }
    });
});

app.listen(3001, () => {
  console.log("running server");
});