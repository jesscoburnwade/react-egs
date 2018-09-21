var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var u = req.url;
    var q = url.parse(req.url, true);
    res.writeHead(200, {'content-type':'text/HTML'});

    if (u == "/") {
        res.write("<h1><b>Select times table</b></h1><br>");
        for (var number = 1; number<=1000; number++) {
            res.write("<a href = 'http://localhost:3001/range?T=" + number + "'>" + number + "</a><br>");
            
        }
    }

    if (q.pathname == "/range") {
        var num = q.query.T;
        res.write("<h1><b>Times Table: " + num + "</b></h1><br>");
        res.write("<h2>Please select a range</h2>");

        for (var rnge = 10; rnge<=100; rnge=rnge+10){
            res.write("<a href = 'http://localhost:3001/range/timestables?T=" + num + "&S=" + rnge + "'>" + rnge + "</a><br>");
        }

        res.write("<br><a href = 'http://localhost:3001/'>Back</a>");
    }

    if (q.pathname =="/range/timestables") {
        var number = q.query.T;
        var range = q.query.S;

        for (var times = 1; times<=range; times++) {
            res.write(number + " x " + times + " = " + number*times + "<br>");
        }

        res.write("<br><a href = 'http://localhost:3001/range?T=" + number + "'>Back</a>");
        res.write("<br><a href = 'http://localhost:3001/'>Home</a>");
    }
    res.end();
})

server.listen(3001);