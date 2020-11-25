const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
const cryptoJS = require('../../utils/cryptoJS');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.MASTER_KEY;

async function getcources(req, res) {
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {

        query = "SELECT *FROM `cources`;";

        queryModel = await mysqlDAO.executeQuery(query);
        logger.log(' Query : ' + query + 'Query Model : ' + JSON.stringify(queryModel));

        if (queryModel.status == 1) {
            resModel.status = 1;
            resModel.data = queryModel;
            resModel.info = queryModel.info;
        } else {
            resModel.status = -3;
            resModel.info = 'DB Query ERROR: ' + JSON.stringify(queryModel);
        }

    } catch (error) {
        resModel.status = -9;
        resModel.info = resModel.info + ': CATCH: ' + error;
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000 } catch (error) {}
    }

    return resModel;
}

// ********************************************************************************** //
// ********************************************************************************** //
async function getfees(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request

        query = "SELECT * FROM alpine_fees ;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

//******************************************************************************//
//******************************************************************************//   
async function noticeBoard(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request

        query = "SELECT * FROM notice;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

//*****************************************************************************************/   
//*****************************************************************************************/   
async function feeStruture(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request

        query = "SELECT * FROM fees;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

//*****************************************************************************************//  
//*****************************************************************************************// 

async function fees(body) {
    //generating query
    let query = '';

    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request

        query = "SELECT * FROM alpine_fees ;";
        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}


// **************************************************************************** //
async function contactForm(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let fullName;
    let contactNo;
    let email;
    let address;
    let description;

    try {

        logger.log('BodyFromServver: ' + JSON.stringify(body));
        // reading query parameter from request
        fullName = body.FullName;
        logger.log('FullName: ' + JSON.stringify(fullName));

        contactNo = body.Contactno;
        logger.log('contactNo: ' + JSON.stringify(contactNo));

        email = body.Email;
        logger.log('email: ' + JSON.stringify(email));

        address = body.Address;
        logger.log('address: ' + JSON.stringify(address));

        description = body.Description;
        logger.log('description: ' + JSON.stringify(description));

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);


        query = "INSERT INTO `contact_form` (full_name, contact_no, email, address, description) VALUES ('" + fullName + "', '" + contactNo + "', '" + email + "', '" + address + "', '" + description + "');";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

//exporting module for node express JS server router
module.exports = { getcources, getfees, noticeBoard, fees, feeStruture, contactForm };