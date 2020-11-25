const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const cryptoJS = require('../utils/cryptoJS');
const constants = require('../utils/constants');
const masterModel = require('../models/master-model');
//const jwt = require('jsonwebtoken');
const jwt = require('../utils/jwt');
const dotenv = require('dotenv');
dotenv.config();

//setting response for all
router.use(async (req, res, next) => {
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  let model = masterModel.getResponseModel();
  let path = req.path;
  let jwtKey = '';
  let currDate = methods.getDateMySQL();
  let nonJwtPath = ['/login','/signup','/tms/logins'];
  try {

    //validating token
    if(token == ''){
      throw 'AUTH ERROR: BLANK: No Valid Authentication token paased in request: ' + token;
    }
    if(token == 'undefined'){
        throw 'AUTH ERROR: UNDEFINED: No Valid Authentication token paased in request: ' + token;
    }
    if (!token) { 
      throw 'AUTH ERROR: No Valid Authentication token paased in request: ' + token;
    }
    // formatting the token string
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); // Remove Bearer from string
    }
    // formatting the token string
    if (token.startsWith('Basic ')) {
      token = token.slice(6, token.length); // Remove Basic from string
    }

    //reading JWT KEY from env file
    jwtKey= process.env.MASTER_KEY;
    if(jwtKey == ''){
        throw 'AUTH ERROR: BLANK JWT KEY: proper value not read from env file!';
    }
    if(jwtKey == 'undefined'){
        throw 'AUTH ERROR: UNDEFINED JWT KEY: proper value not read from env file!';
    }

    //Exception for paths
    //login page is excluded from checking the token
    if(path.startsWith('/test/') || nonJwtPath.includes(path)){
      if(token == cryptoJS.MD5(currDate)){
        next();
      }else{
        throw 'AUTH ERROR: Invalid Authorization for Non Token path URLs!';
      }
    }else{
      // verifying the JST token
      let payload = jwt.getJwtPayload(token);

      // setting the response header
      let userID = payload.userID;
      let resToken = jwt.getJwtToken({ userID: userID, dt: new Date() });
      res.setHeader("authorization", resToken);
      next();
    }

    
  } catch (error) {
    model.status = constants.AUTH_ERROR;
    model.info = error + '';
    return res.status(constants.HTTP_UNAUTHORIZED).json(model);
  }

});

module.exports = { router };
