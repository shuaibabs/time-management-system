const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');

//setting response for all
router.use(async (req, res, next) => {
    let resJson;
    let token;
    try {
        //reading response json
        res.body.endDT = new Date();

        //generating token for
        token = jwt.getJwtToken(resJson);
        
        //setting the response header
        res.setHeader("authorization", token);
        res.status(constants.HTTP_OK);
    } catch (error) {
        logger.error('reposne-provider: ' + error);
        return res.status(constants.HTTP_UNAUTHORIZED);
    }

});

module.exports = { router };
