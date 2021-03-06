const fs = require('fs');
const imagesModel = require('./imagesModel');

var addImage = (data, callback) => {
  imagesModel.findOne({}).select('id').sort({id:-1}).exec((err, doc) =>{
    if (err) {
      console.log(err);
      callback(err);
    } else {

      var id = doc && doc.id ? doc.id +1 :1;
      data.id =id;
      imagesModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      })
    }
  })
}

var getAllImages = (cb) => {
  imagesModel.find({}, (err, doc) => {
    if (err) {
      cb(err);
    } else {
      cb(null, doc);
    }
  })
}


var fetchImageCollection = () => {
  var imageInfoCollection = [];

  try {
    var contents = fs.readFileSync('imageData.json','utf-8');

    imageInfoCollection = JSON.parse(contents);

  } catch (e) {
    console.log(e);
  }

  return imageInfoCollection;
}

var saveImageCollection = (data) => {
    fs.writeFileSync('imageData.json', JSON.stringify(data));
}

var deleteImageById = (id,callback) => {
  imagesModel.deleteOne({id:id},(err,doc)=>{
    if(err){
      callback(err);
    }else {
      callback(null,doc);
    }
  })
}

// var updateImageCollectionById = (id, newData) => {
//   var imageInfoCollection = fetchImageCollection();
//
//   if (id < 1 || id > imageInfoCollection.length)
//     return 'Id invalid';
//   else {
//     imageInfoCollection[id-1] = newData;
//
//     saveImageCollection(imageInfoCollection);
//     return 'Success';
//   }
// }

var updateImageById = (newData, callback) => {
  imagesModel.updateOne({
    id: newData.id
  }, {
    $set: {
      name: newData.name,
      imageLink: newData.imageLink,
      description: newData.description
    }
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}


module.exports = {
  fetchImageCollection,
  saveImageCollection,
  updateImageById,
  addImage,
  getAllImages,
  deleteImageById
}
