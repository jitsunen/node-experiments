var CountStream = require("./countstream");
var countstream = new CountStream('book');
var http = require("http");
http.get("http://www.manning.com", function(res){
  res.pipe(countstream);
});

countstream.on("total", function(count){
  console.log("total matches", count);
});
