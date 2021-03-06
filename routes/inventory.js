var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('in get inventory route');
    pool.connect(function (connectionError, client, done) {
        // connectionError - if error occurrs connect to the db
        // client is our worker to run our query
        // done - function we will call to release the client
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            // ask the client to run our query
            // params 1. query itself, 2. is callback
            client.query('SELECT * FROM inventory;', function (queryError, resultObj) {
                done();
                // var resultObj
                // queryError any error that happens in executing the query
                // resultObj response object from db via pg contains the result set
                if (queryError) {
                    console.log(connectionError);
                    res.sendStatus(500);
                } else {
                    // resultObj.rows contains the result set as an array of objects
                    console.log('resultObj.rows ->', resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var clientItem = req.body.item;
    console.log('in post inventory route', clientItem);

    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            // query string
            // values to insert into the query string
            // callback func that will run with query is complete

            // parameterized queries
            // https://node-postgres.com/features/queries
            var queryString = 'INSERT INTO inventory (item) VALUES ($1);';
            var values = [clientItem];
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(connectionError);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res) {
    console.log('in delete inventory route');
    console.log('req.params.id ->', req.params.id);
    var dbId = req.params.id;

    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('connection error in router.delete ', connectionError);
            res.sendStatus(500);
        } else {
            var queryString = "DELETE FROM inventory WHERE id=($1);";
            var values = [dbId];
            client.query(queryString, values, function (err, result) {
                done();
                if (err) {
                    console.log(err, ' <- logging queryError in router.delete query');
                    res.sendStatus(500);
                } else {
                    console.log('Logging resultObj from router.delete -> ', result.rows);
                    // res.send(result.rows);
                    res.sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;