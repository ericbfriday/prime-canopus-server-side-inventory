var router = require('express').Router();

// global inventory variable
var inventory = ['the ring', 'trousers', 'buttons', 'hairy feet'];

router.get('/', function(req, res) {
    console.log('in get inventory route');
   res.send(inventory);
});

router.post('/', function(req, res) {
   var item = req.body.item;    
   console.log('in post inventory route', item);
   inventory.push(item);
   res.sendStatus(201);
});

module.exports = router;

