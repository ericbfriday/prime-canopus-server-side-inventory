var express = require('express');
var bodyParser = require('body-parser');

// require routers
var indexRouter = require('./routes/index');

var app = express();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

//middleware
app.use(bodyParser.urlencoded({extended: true}));

// this serve all other client side files
// client.js, jquery, css
app.use(express.static('public')); // public folder

// Routes
app.use('/', indexRouter);

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