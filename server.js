var express = require('express');
var app = express();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

app.get('/inventory', function(req, res) {
     console.log('in get inventory route');
    res.send(inventory);
});

app.listen(3000, function() {
    console.log('listening on 3000');
});