 var express=require('express');
 var bodyParser = require('body-parser');
 var app=express();

 app.use(bodyParser.json());


//  app.use(function(req, res, next){
//      res.header("Access-Controll")
//  })
 app.use(function(req, res, next) {
  //  res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //  

    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true),
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'),
    res.header ('Access-Control-Allow-Headers', 'Content-Type')
    next();
  });


mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database: 'sosialdb'
})

app.get('/api/posts', function(req,res){
    
    connection.query('select * from dtotbpost', function(err,recordset){
        if(err) console.log(err);
        res.json(recordset);
    })
    
    
    
    // res.json([
    //     {
    //         username:'samxx',
    //         body:'node rock !!!'
    //     }
    // ])
})

app.post('/api/posts', function(req,res){
    // console.log(req);
    // res.send(201);

    connection.query('CALL sp_CreatePost(?,?)',[req.body.username,req.body.body], (err,recordset) =>{
        if(err) console.log(err);
        res.json(recordset);
})
})

app.listen(3000,function(){
    console.log('sever listening on', 3000)
})

