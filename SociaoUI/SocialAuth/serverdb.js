
var express=require('express');
var jwt=require('jwt-simple')
var app = express()
var bcrypt = require('bcrypt')
app.use(bodyParser.json());

mysql = require('mysql')

var secretKey='supersecretkey'

mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database: 'sosialdb'
})

app.post('/session', function(req,res){
    // console.log(req);
    // res.send(201);

    connection.query('CALL listUsers(?,?)',[req.body.username,req.body.pass], (err,recordset) =>{
        if(err) console.log(err);
        res.json(recordset);
})
})

app.listen(3000,function(){
    console.log('sever listening on', 3000)
})