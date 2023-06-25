
const express   = require('express');
const cors      = require('cors');
const mysql     = require('mysql2');
//const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors({
    origin:'*'
}));


const con = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

con.connect(function(err){
    if (err) throw err;
    else console.log("Database ON");
});

app.listen(PORT, (err)=>{
    if(!err)
        console.log("Servidor OK porta "+PORT);
    else
        console.log("Servidor nao inicializado\n"+err);
});

app.get('/',(req,res)=>{
    res.status(200);
    res.send("Servidor Teste");
});

app.get('/pessoa',(req,res)=>{
    con.query("SELECT * FROM pessoa",(err,result,fields)=>{
        if(err)
        res.status(505).send("Erro no servidor");
        else
        res.send(result);
    });
});

app.get('/pessoa/:id',(req,res)=>{
    const {id} = req.params;
    con.query(`SELECT * FROM pessoa WHERE id = ${id};`,(err,result,fields)=>{
        if(err)
        res.status(505).send("Erro no servidor");
        else
        res.send(result);
    });
});

app.post('/pessoa',(req,res)=>{
    const {id,nome, telefone, email} = req.body;
    console.log(`(${id},${nome}, ${telefone}, ${email})`);
    const sql = `INSERT INTO pessoa (id, nome, telefone, email) VALUES(${id}, '${nome}', '${telefone}', '${email}')`;
    con.query(sql,(err,result)=>{
        if (err)
        res.status(505).send("Erro no servidor\n"+err);
        else
        res.status(200).send('ok');
        console.log(result);
    });    
});

app.put('/pessoa/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const {nome, telefone, email} = req.body;
    const sql = `UPDATE pessoa SET nome='${nome}', telefone='${telefone}', email='${email}' WHERE id=${id};`;
    con.query(sql,(err, result) => {
        if (err) 
            res.status(505).send("Erro no servidor");
        else
            res.status(200).send('ok');
        console.log(result);
    });
});

app.delete('/pessoa/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const sql = `DELETE FROM pessoa WHERE id=${id};`;
    con.query(sql,(err, result) => {
        if (err) 
            res.status(505).send("Erro no servidor");
        else
            res.status(200).send('ok');
        console.log(result);
    });
});
