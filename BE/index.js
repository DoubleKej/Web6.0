'use strict';

const fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname+'/public'));
app.get('/', function(req, res){
  res.send('./public/index.html');
});

app.get('/image/add',(req,res) => {
  //khai bao object
  var imageinfo = {
    name : req.query.name,
    imagelink : req.query.imagelink,
    description : req.query.description
  }
  //luu lai vao file
  fs.writeFileSync('imageData.json',JSON.stringify(imageinfo));
  //bao thanh cong
  res.send('Success');
})
//

app.get('/image/get',(rep,res) =>{
  var img = fs.readFileSync('imageData.json','utf-8');

  var imgJson = JSON.parse(img);
  var listImg = '';
    listImg += '<h1>' + imgJson.name +'</h1>'+
               '<h2>' + imgJson.description +'</h2>'+
               '<img src = "' + imgJson.imagelink + '">';
  res.send(listImg);
})

http.listen(6969, function(){
  console.log('Server started. Listening on *:6969');
});
