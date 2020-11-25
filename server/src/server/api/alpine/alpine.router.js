const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const masterModel = require('../../models/master-model');

// file for testing API's
let alpine = require('./alpine');

//declarinfg Router for the express app
// ******************** DO NOT ALTER THE ABOVE CODE ***********************
// *************** // *************** // *************** // ***************

// API for testing get request , executing the query
router.post("/test/silver/courses", async(req, res) => {


    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.getcources(payload);

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


// API for testing get request , executing the query
router.post("/test/silver/fees", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.getfees(payload);

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

// API for testing get request , executing the query
router.post("/test/alpine/notice", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.noticeBoard(payload);

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

// *******************************************************************************//
// *******************************************************************************//

// API for Fee Structure 
router.post("/test/alpine/feestructure", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.feeStruture(payload);

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

// *******************************************************************************//
// *******************************************************************************//

// API for Fee Structure 
router.post("/test/silver/getfees", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.fees(payload);

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

// *******************************************************************************//
// *******************************Contaact Form***********************************//

// API for Fee Structure 
router.post("/test/silver/contact", async(req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await alpine.contactForm(payload);

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