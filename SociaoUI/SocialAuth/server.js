var express = require('express')
var jwt = require('jwt-simple')
var app = express()
var bcrypt = require('bcrypt')
app.use(require('body-parser').json())
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sosialdb'

});

var secretKey = 'supersecretKey'

app.post('/session', function(req, res, next) {

    connection.query("call `SP_selectUser`(?)", [req.body.username], function(err, recordset) {
        console.log(recordset[0][0].username);
        // bcrypt.compare(req.body.password, recordset[0][0].password, function(err, valid) {
        //     if (err) { console.log(err) }
        //     if (!valid) { console.log("err with sth") }
        //     var token = jwt.encode({ username: recordset[0][0].username }, secretKey)
        //     res.json(token)
        // });
    })
})

app.get('/user', function(req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        console.log(token);
        var user1 = jwt.decode(token, secretKey);
        console.log(user1.username);
        // var query = "select * from tblUser where username = '" + user1.username + "'";
        connection.query("select * from tblUser where username = '" + user1.username + "'", function(err, recordset) {
            if (err) {
                console.log(err);
            }
            res.json(recordset)
        });
    }
    // res.json({ username: 'sam' });
})

app.post('/user', function(req, res, next) {
    var username = req.body.username;
    console.log(username)
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        var password = hash;
        console.log(hash)
        connection.query("call listUsers(?,?)", [username, password], function(recorset) {
            console.log(recorset)
            res.json(201);
        });
    })
})
app.listen(3000, function() {
    console.log('server listening on', 3000)
})