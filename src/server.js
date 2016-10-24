var express = require('express');
var app = express();

var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var bodyParser = require('body-parser');

var pgp = require("pg-promise")(options);
var connectionString = "postgres://localhost:5432/tasks_db";
var db = pgp(connectionString);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create postgres table if not exists
db.none("CREATE TABLE IF NOT EXISTS tasks (id SERIAL, text TEXT, complete BOOLEAN)").then(function() {
    console.log ('created table');
});


// GET items from database
app.get('/tasks', function (req, res) {

    db.any('SELECT * FROM tasks')
        .then(function(tasks) {
            res.json(tasks);
        })
        .catch(function(error) {
            return next(error);
        });
});


// POST to ADD new item to tasks list
app.post('/tasks', function(req, res, next) {

    var insertion = 'INSERT INTO tasks (text, complete) VALUES ($1, $2)';

    db.none(insertion, [req.body.text, false])
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            return next(err);
        });
});


// PUT to UPDATE existing item in tasks list
app.put('/tasks/:id', function(req, res, next) {

    var itemID = parseInt(req.params.id);
    var update = 'UPDATE tasks SET complete=true WHERE id=$1';

    db.none(update, [itemID])
        .then(function () {
            res.json();
        })
        .catch(function (err) {
            return next(err);
        });
});


app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
