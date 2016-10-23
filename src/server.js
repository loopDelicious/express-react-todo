var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tasks', function (req, res) {

    var tasks = ['apple','berry','cherry'];

    res.json(tasks);

});

// TODO add other routes here

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
