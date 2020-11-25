const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
const cryptoJS = require('../../utils/cryptoJS');
const dotenv = require('dotenv');
const convert = require('../../utils/convert');
dotenv.config();

const key = process.env.CRYPTOJS_KEY;

// *********************************************************************//
// *******************************FPR GETDATA***************************//

async function getdetils(body) {
  //generating query
  let startMS = methods.getDTS();
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  try {
    // reading query parameter from request


    query = "SELECT tud.user_id, tud.full_name, tud.email, IF( CURRENT_DATE() = DATE(check_in_dt), 'check-in', 'absent') AS check_in, IF( CURRENT_DATE() = DATE(check_out_dt), 'check-out', 'absent') AS check_out FROM gt_tms.tms_user_details tud LEFT JOIN gt_tms.tms_daily_attendance tda ON tud.user_id = tda.user_id AND tda.date = CURRENT_DATE() ORDER BY tud.full_name ASC;";


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
    try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) { }
  }
  //returning the model   
  return resModel;
}

// *********************************************************************//
// *******************************FPR USER DETAILS***************************//

async function getusertable(body) {
  //generating query
  let startMS = methods.getDTS();
  let query = '';
  let query1 = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  let user_id= '' ;
  try {
    // reading query parameter from request

    logger.log('body::' + JSON.stringify(body));
    user_id = body.user_id;
    
    query = "SELECT * FROM gt_tms.view_tms_user_data WHERE user_id = '" + user_id +"' LIMIT 10" ; 

    // getting result from executing query
    queryModel = await mysqlDAO.executeQuery(query);
    console.log('querydata:::' + JSON.stringify(queryModel));

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
    try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) { }
  }
  //returning the model   
  return resModel;
}

// ***************************************************************************//
// *******************************FPR Check_in_data***************************//
async function check_IN(body) {
  //generating query
  let query = '';
  let employee_code = '';
  let startMS = methods.getDTS();
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  let remark = '';
  let date = '';
  let check_in_DT = '';
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date1 = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let current = (year + "-" + month + "-" + date1);
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let now = (year + "-" + month + "-" + date1 + " " + hours + ":" + minutes + ":" + seconds);

  try {
    // reading query parameter from request

    employee_code = body.code;
    logger.log('date:' + employee_code)
    logger.log('date:' + current)
    logger.log('check_in_date::' + now)
    query = "INSERT IGNORE INTO gt_tms.tms_daily_attendance (user_id, date, check_in_DT) VALUES('" + employee_code + "', '" + current + "','" + now + "' );";
    logger.log('query::' + query);

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
    try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) { }
  }
  //returning the model
  return resModel;
}

// *********************************************************************//
// *******************************FPR Check_out***************************//
async function check_out(body) {
  //generating query
  let query = '';
  let employee_code = '';
  let startMS = methods.getDTS();
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let current = (year + "-" + month + "-" + date);
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let now = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  try {
    // reading query parameter from request


    employee_code = body.code;
    logger.log('user_id' + employee_code)

    query = "UPDATE gt_tms.tms_daily_attendance SET check_out_DT= " + "'" + now + "'" + " WHERE user_id = " + "'" + employee_code + "'" + " AND date = " + "'" + current + "'" + ";";
    logger.log('query' + query)

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
    try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) { }
  }
  //returning the model
  return resModel;
}

// *********************************************************************//
// *******************************FPR Check_out***************************//


module.exports = { getdetils, check_IN, check_out, getusertable}; 