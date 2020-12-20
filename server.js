// imports

var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;



// instance express

var server = express();

// body-parser configuration
server.use(bodyParser.urlencoded({ extended: true}));
server.use(bodyParser.json());


server.get('/nos-deals', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Wellcome to nosdeals api <h1>');
})

server.use("/nos-deals/api/", apiRouter);

// launched 

server.listen(8080, function(){
    console.log("server run on localhost:8080/nos-deals/api/"); 
})