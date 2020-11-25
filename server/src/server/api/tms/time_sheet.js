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
// *******************************FOR LOGIN***************************//
async function login(payload) {
    let startMS = new Date().getTime();
    let userID = '';
    let passwd = '';
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
        userID = payload.username;
        passwd = payload.password;

        logger.log(userID + ' : ' + passwd);
        if (userID == 'undefined' || userID == null || userID == '') {
            throw 'Invalid userID:' + userID;
        }

        if (passwd == 'undefined' || passwd == null || passwd == '') {
            throw 'Invalid passwd:' + passwd;
        }

        //executing que
        query = "SELECT tl.user_id, tl.passwd, tud.full_name, tud.email FROM gt_tms.tms_login tl LEFT JOIN gt_tms.tms_user_details tud ON tl.user_id = tud.user_id WHERE tl.user_id = '" + userID + "' AND tl.passwd = '" + passwd + "';";
        queryModel = await mysqlDAO.executeQuery(query);
        // check if query is executed successfully
        if (queryModel.status != 1) {
            throw 'Error/Issue with DB user details query: ' + queryModel.info;
        }
        // check if only one and only one record is fetcehd from server for the user
        if (queryModel.fetchedRows <= 0) {
            throw 'No Record Found for user details query: ' + queryModel.info + ' : ' + userID;
        }

        resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
        resModel.data = queryModel;
        resModel.status = 1;

    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
    }
    return resModel;
}


// *********************************************************************//
// *******************************FPR PROJECT***************************//
async function project(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request

        query = "SELECT DISTINCT project FROM `tss_project_master`;";

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

// *********************************************************************//
// *******************************FOR MODULE***************************//
async function getmodule(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let Project_name;
    try {
        // reading query parameter from request
        Project_name = body.projectName;

        query = "SELECT DISTINCT module FROM `tss_project_master` WHERE project = '" + Project_name + "';";

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

// *********************************************************************//
// *******************************FOR SUB_MODULE***************************//
async function getsubmodule(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let Project_name;
    let Module_name;
    try {
        // reading query parameter from request
        Project_name = body.projectName;
        logger.log('Project: ' + JSON.stringify(Project_name));
        Module_name = body.moduleee;
        logger.log('Module_name: ' + JSON.stringify(Module_name));

        query = "SELECT DISTINCT sub_module FROM `tss_project_master` WHERE project = '" + Project_name + "' AND module = '" + Module_name + "';";

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

// *********************************************************************//
// *******************************FOR TASK******************************//
async function gettask(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let Project_name;
    let Module_name;
    let submodule;
    try {
        // reading query parameter from request
        Project_name = body.projectName;
        logger.log('Project: ' + JSON.stringify(Project_name));
        Module_name = body.moduleee;
        logger.log('Module_name: ' + JSON.stringify(Module_name));
        submodule = body.submodule;
        logger.log('submodule: ' + JSON.stringify(submodule));

        query = "SELECT DISTINCT task FROM `tss_project_master` WHERE project = '" + Project_name + "' AND module = '" + Module_name + "' AND sub_module = '" + submodule + "';";

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

// *********************************************************************//
// ********************Current Date And Week****************************//
async function currentDateWeek(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();

    try {
        // reading query parameter from request

        query = "SELECT DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY) Mon, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 1 DAY) Tue, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 2 DAY) Wed, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 3 DAY) Thr, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 4 DAY) Fri, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 5 DAY) Sat, DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL  -WEEKDAY(CURRENT_DATE()) DAY), INTERVAL 6 DAY) Sun, CURRENT_DATE() AS `current_date`, DAYNAME(CURRENT_DATE()) AS `Day`;";

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


// *********************************************************************//
// *******************************FOR user_data******************************//
async function user_id(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let user_id;
    try {
        // reading query parameter from request
        user_id = body.userid;
        logger.log('user id: ' + JSON.stringify(user_id));

        query = "SELECT full_name, email FROM gt_tms.tms_user_details WHERE user_id = '" + user_id + "';";

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

// **************************************************************************//
// *******************************FOR POST THE DATA***************************//
async function postdata(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let DataArray;
    let convertedString;
    let values;
    let model = [];
    let ModelDataArray = [];
    let modelJSON = {};
    let i;
    let SumbitArray = [];
    try {
        data = body;
        for (i = 0; i < 10; i++) {
            model = [{
                    userId: data.user_id,
                    date: data.monday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].mon
                },
                {
                    userId: data.user_id,
                    date: data.tuesday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].tue
                },
                {
                    userId: data.user_id,
                    date: data.wednesday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].wed
                },
                {
                    userId: data.user_id,
                    date: data.thrusday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].thu
                },
                {
                    userId: data.user_id,
                    date: data.friday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].fri
                },
                {
                    userId: data.user_id,
                    date: data.saturday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].sat
                },
                {
                    userId: data.user_id,
                    date: data.sunday,
                    projectName: data.rows[i].project,
                    moduleName: data.rows[i].module,
                    subModuleName: data.rows[i].sub_module,
                    task: data.rows[i].task,
                    remarks: data.rows[i].remarks,
                    hours: data.rows[i].sun
                }
            ];
            ModelDataArray.push(model);
        }


        for (let j = 0; j < 10; j++) {
            for (let k = 0; k < 7; k++) {
                modelJSON = {
                    userId: ModelDataArray[j][k].userId,
                    date: ModelDataArray[j][k].date,
                    projectName: ModelDataArray[j][k].projectName,
                    moduleName: ModelDataArray[j][k].moduleName,
                    subModuleName: ModelDataArray[j][k].subModuleName,
                    task: ModelDataArray[j][k].task,
                    remarks: ModelDataArray[j][k].remarks,
                    hours: ModelDataArray[j][k].hours
                };
                SumbitArray.push(modelJSON);
            }
        }

        convertedArray = convert.ObjToArray(SumbitArray);
        convertedString = convert.convertIntoString(convertedArray);
        values = convertedString.replace(/\\/g, "");;
        logger.log('values:: ' + values);

        query = "INSERT INTO `gt_tms`.`tms_user_timesheet` (user_id, date, Project_name," +
            "Module_name, Sub_module_name, Task, Remarks, hours) VALUES" +
            values +
            "ON DUPLICATE KEY UPDATE " +
            "Remarks = VALUES(Remarks), " +
            "hours = VALUES(hours)" +
            ";";


        logger.log('query:::' + query);

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



// *********************************************************************//
// ********************Get Data to TMS OnLoad***************************//
async function getTMSDataOnLoad(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let user_id = "";
    let monday = "";
    let tuesday = "";
    let wednesday = "";
    let thursday = "";
    let friday = "";
    let saturdy = "";
    let sunday = "";
    try {
        // reading query parameter from request
        user_id = body.userID;
        monday = body.monday;
        tuesday = body.tuesday;
        wednesday = body.wednesday;
        thursday = body.thursday;
        friday = body.friday;
        saturdy = body.saturday;
        sunday = body.sunday;

        query = "SELECT user_id,project_name, module_name,sub_module_name, task, remarks," +
            "SUM(CASE WHEN `date` = '" + monday + "' THEN hours ELSE 0 END) AS `Mon`," +
            "SUM(CASE WHEN `date` = '" + tuesday + "' THEN hours ELSE 0 END) AS `Tue`," +
            "SUM(CASE WHEN `date` = '" + wednesday + "' THEN hours ELSE 0 END) AS `Wed`," +
            "SUM(CASE WHEN `date` = '" + thursday + "' THEN hours ELSE 0 END) AS `Thu`," +
            "SUM(CASE WHEN `date` = '" + friday + "' THEN hours ELSE 0 END) AS `Fri`," +
            "SUM(CASE WHEN `date` = '" + saturdy + "' THEN hours ELSE 0 END) AS `Sat`," +
            "SUM(CASE WHEN `date` = '" + sunday + "' THEN hours ELSE 0 END) AS `Sun`" +
            "FROM `tms_user_timesheet`" +
            "WHERE user_id = '" + user_id + "'" +
            "GROUP BY user_id,project_name, module_name,sub_module_name, task, remarks;";

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
// *********************************************************************//
//exporting module for node express JS server router
module.exports = { login, project, getmodule, getsubmodule, gettask, currentDateWeek, user_id, postdata, getTMSDataOnLoad };