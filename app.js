var express = require("express");
var Promise = require("bluebird");

var app = express();
var port = 1310;

app.get("/", function(req, res, next) {
	req.url == "/" ? req.url = "./index.html" :  req.url = req.url;
	next();
});
app.use(express.static(__dirname + '/'));


app.listen(port, function() {
	console.log("listen %d", port);
});