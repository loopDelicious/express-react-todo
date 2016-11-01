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
var bcrypt = require("bcryptjs");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create postgres table if not exists
db.none("CREATE TABLE IF NOT EXISTS tasks (id SERIAL, text TEXT, complete BOOLEAN)").then(function() {
    console.log ('created TASKS');
});
db.none("CREATE TABLE IF NOT EXISTS users (id SERIAL, email TEXT, hash TEXT)").then(function() {
    console.log('created USERS');
});


// TASKS TABLE ===============================================

// GET items from tasks table
app.get('/tasks', function (req, res) {

    db.any('SELECT * FROM tasks WHERE complete is false')
        .then(function(tasks) {
            res.json(tasks);
        })
        .catch(function(error) {
            return next(error);
        });
});

// POST to ADD new item to tasks table
app.post('/tasks', function(req, res, next) {

    var insertion = 'INSERT INTO tasks (text, complete) VALUES ($1, $2) RETURNING id, text, complete';

    db.one(insertion, [req.body.text, false])
        .then(function (id) {
            res.json(id);
        })
        .catch(function (err) {
            return next(err);
        });
});

// POST to UPDATE existing item in tasks table
app.post('/tasks/update', function(req, res, next) {

    var itemList = req.body['ids[]'];
    // console.log(itemList);
    // console.log(typeof(itemList));  // 97 is string and errors forEach is not a function; [ '96', '97' ] is an object and submits

    // console.log(itemList);  // { 'ids[]': [ '94', '95' ] }  OR THIS  { 'ids[]': '94' }
    // console.log(itemList[0]);  // undefined
    // console.log(itemList['ids']); // undefined
    // console.log(itemList['ids[]']); // [ '94', '95' ]

    if (typeof(itemList) != "string") {
        itemList.forEach(function (item) {
            var itemID = parseInt(item);
            var update = 'UPDATE tasks SET complete=true WHERE id=$1';
            db.any(update, [itemID])
                .then(function () {
                    res.json();
                })
                .catch(function (err) {
                    return next(err);
                });
        })
    } else {
        var itemID = parseInt(itemList);
        var update = 'UPDATE tasks SET complete=true WHERE id=$1';
        db.any(update, [itemID])
            .then(function () {
                res.json();
            })
            .catch(function (err) {
                return next(err);
            });
        }
});


// USERS TABLE ===============================================

// POST to ADD new user to users table
app.post('/register', function(req, res, next) {

    var email = req.body.email;
    var hash = bcrypt.hashSync(req.body.password, 8);
    var insertion = 'INSERT INTO users (email, hash) VALUES ($1, $2) RETURNING id, email, hash';

    db.one(insertion, [email, hash])
        .then(function (id) {
            res.json(id);
        })
        .catch(function (err) {
            return next(err);
        });
});

// GET to verify user in users table
app.get('/login', function(req, res, next) {

    var email = req.body.email;
    var new_hash = bcrypt.hashSync(req.body.password, 8);
    console.log(email);
    console.log(req.body.password);

    var possible_user = db.any('SELECT * FROM users WHERE email is ' + email);
    if (new_hash == possible_user.hash) {
        res.json('success');
    } else {
        res.json('please try again');
    }
});






app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
