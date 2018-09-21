var http = require('http');
var url = require('url');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get("/times", function(req, res) {
    res.write("<h1><b>Select times table</b></h1><br>");
    for (var number = 1; number<=1000; number++) {
        res.write("<a href = 'http://localhost:3000/times/range?T=" + number + "'>" + number + "</a><br>");
    }

    res.end();
});

app.get("/times/range", function(req, res) {
    var num = q.query.T;
    res.write("<h1><b>Times Table: " + num + "</b></h1><br>");
    res.write("<h2>Please select a range</h2>");

    for (var rnge = 10; rnge<=100; rnge=rnge+10){
        res.write("<a href = 'http://localhost:3000/times/range/timestables?T=" + num + "&S=" + rnge + "'>" + rnge + "</a><br>");
    }

    res.write("<br><a href = 'http://localhost:3000/times'>Back</a>");

    res.end();
})

app.get("/times/range/timestables", function(req, res) {
    var number = q.query.T;
    var range = q.query.S;

    for (var times = 1; times<=range; times++) {
        res.write(number + " x " + times + " = " + number*times + "<br>");
    }

    res.write("<br><a href = 'http://localhost:3000/times/range?T=" + number + "'>Back</a>");
    res.write("<br><a href = 'http://localhost:3000/times'>Home</a>");

    res.end();
})

app.listen(3000);