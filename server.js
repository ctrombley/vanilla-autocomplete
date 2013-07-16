/*globals require */
var fs = require('fs');
var http = require('http');
var url = require('url');
var autocomplete = require('autocomplete');
var static = require('node-static');

console.log('Loading words...');
var data = fs.readFileSync('./words.txt');
var words = data.toString().split("\r\n");

console.log('Initializing autocomplete...');
var ac = autocomplete.connectAutocomplete();
ac.initialize(function (onReady) {
  onReady(words);
});

console.log('Starting server...');
var file = new(static.Server)();
http.createServer(function (req, res) {
  var queryData = url.parse(req.url, true).query;

  if (queryData.search) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var matches = ac.search(queryData.search);
    res.end(JSON.stringify(matches));
  }
  else {
    file.serve(req, res);
  }
}).listen(8888, '127.0.0.1');

console.log('Ready.');
