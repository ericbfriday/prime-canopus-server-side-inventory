var express = require('express');
var path = require('path');
var app = express();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

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

app.listen(3000, function() {
    console.log('listening on 3000');
});