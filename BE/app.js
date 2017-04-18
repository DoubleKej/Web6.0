console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const imagesController = require(__dirname + '/modules/images/imagesController');
var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  extened: true
}));
app.use(bodyParser.urlencoded({
  extened: true
}));
app.get('/', (req, res) => {
  res.send('./public/index.html');
})

var getAllImage = function() {
  var imageInfoCollection = imagesController.fetchImageCollection();
  try {
    contents = fs.readFileSync('imageData.json', 'utf-8');

    imageInfoCollection = JSON.parse(contents);

    return imageInfoCollection;
  } catch (e) {
    return [];
    console.log(e);
  }
}


app.post('/image', (req, res) => {

  var imageInfoCollection = getAllImage();
  var id = -1;
  if (imageInfoCollection.length !== 0) {
    id = imageInfoCollection[imageInfoCollection.length - 1].id;
  }
  //khai bao object
  var imageInfo = {
    id: (id + 1),
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }

  //push data moi vao colection
  imageInfoCollection.push(imageInfo);


  //luu lai vao file
  fs.writeFileSync('imageData.json', JSON.stringify(imageInfoCollection));
  //bao thanh cong
  res.redirect('/image');
})

app.get('/image', (req, res) => {
  var imageInfoCollection = getAllImage();
  var htmlString = '';
  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>Mota: ${data.description}</div><form action="/image/delete/${data.id}" method="post">
      <input type="submit" />
    </form>`
  })
  res.send(htmlString);
})

app.put('/image', (req, res) => {

})
app.post('/image/delete/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  var imageInfoCollection = getAllImage();
  for (var i = 0; i < imageInfoCollection.length; i++) {
    if (imageInfoCollection[i].id == id) {
      imageInfoCollection.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync('imageData.json', JSON.stringify(imageInfoCollection));
  res.redirect('/image');
})

//mo port chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
