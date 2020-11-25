const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
let masterModel = require('../../models/master-model');

// file for testing API's
let tms = require('./tms');
let time_sheet = require('./time_sheet');

let ams = require('./ams');

//declarinfg Router for the express app
// ******* DO NOT ALTER THE ABOVE CODE ********
// ******************************************************************** //
// ***************************GET USER******************************* //
router.post("/test/ams/getdetails", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await ams.getdetils(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});


// ******************************************************************** //
// **************************GET USER DETAILS************************** //
router.post("/test/ams/getusertable", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await ams.getusertable(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});



// ******************************************************************** //
// ******************************************************************** //
// API for testing get request , executing the query
router.post("/test/ams/check_out", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await ams.check_out(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});


// ******************************************************************** //
// ******************************************************************** //
// API for testing get request , executing the query
router.post("/test/ams/check_IN", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await ams.check_IN(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// *********************************************************************//
// *******************************FOR LOGIN***************************//
router.post("/test/tms/login", async(req, res) => {
    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.login(payload);

        //setting authorization header of response
        //generating jwt token for authentication// need to pass payload Json
        let userID = payload.username;
        token = jwt.getJwtToken({ userID: userID, dt: new Date() });
        if (token == '' || token == null || token == 'undefined') {
            throw 'Not able to generate token for authentication, contact system admin!';
        } else {
            //setting authorization header of response
            res.setHeader("authorization", token);
        }

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// *********************************************************************//
// *******************************FOR PROJECT***************************//
router.post("/test/time_sheet/project", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.project(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// *********************************************************************//
// *******************************FOR MODULE***************************//
router.post("/test/time_sheet/module", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.getmodule(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// ************************************************************************//
// *******************************FOR SUB_MODULE***************************//
router.post("/test/time_sheet/submodule", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.getsubmodule(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// ************************************************************************//
// *******************************FOR TASK***************************//
router.post("/test/time_sheet/task", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.gettask(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// ************************************************************************//
// *******************************FOR CURRENT DATE*********************************//
router.post("/test/current/dateweek", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await time_sheet.currentDateWeek(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});


// ************************************************************************//
// *******************************FOR user details*********************************//
router.post("/test/tms/user_id", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // ** dont change above code, please wtite your router code below ** //

        resModel = await time_sheet.user_id(payload);

        // ** dont change below code, write your code baove this only ** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// ************************************************************************//
// *******************************FOR SUBMIT DATA***************************//
router.post("/test/time_sheet/data", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.postdata(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});


// *********************************************************************//
// ********************Get Data to TMS OnLoad***************************//
router.post("/test/get/tms/data/onload", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await time_sheet.getTMSDataOnLoad(payload);

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// *************** // *************** // *************** // ***************
// ****************** DO NOT ALTER THE BELOW CODE *************************
//exporting all Routes module for node express JS server
module.exports = { router };