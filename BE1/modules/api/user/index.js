const express = require('express');
const Router = express.Router();
const userController = require('./userController');

Router.post('/', (req, res)=>{
  var userInfo = {
    name: req.body.name,
    userName: req.body.userName,
    password:req.body.password,
    email: req.body.email
  }
  console.log('post data', req.body);

  userController.createUser(userInfo, (err, doc) =>{
    if (err) {
      console.log(err);
      res.end('Loi cmnr');
    } else {
      res.end('Ngon');
    }
  })
})

module.exports = Router;
