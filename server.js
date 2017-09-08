var express = require('express');
var bodyParser = require('body-parser');

// require routers
var indexRouter = require('./routes/index');
var inventoryRouter = require('./routes/inventory');

var app = express();

//middleware
app.use(bodyParser.urlencoded({extended: true}));

// this serve all other client side files
// client.js, jquery, css
app.use(express.static('public')); // public folder

// Routes
app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

app.listen(3000, function() {
    console.log('listening on 3000');
});