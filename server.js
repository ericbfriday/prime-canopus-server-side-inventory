var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

//middleware
app.use(bodyParser.urlencoded({extended: true}));

// this serve all other client side files
// client.js, jquery, css
app.use(express.static('public')); // public folder


app.get('/', function(req, res) {
    var indexPath = path.join(__dirname, './public/views/index.html');
    console.log(indexPath);
    res.sendFile(indexPath);
});

app.get('/inventory', function(req, res) {
     console.log('in get inventory route');
    res.send(inventory);
});

app.post('/inventory', function(req, res) {
    var item = req.body.item;    
    console.log('in post inventory route', item);
    inventory.push(item);
    res.sendStatus(201);
});

app.listen(3000, function() {
    console.log('listening on 3000');
});