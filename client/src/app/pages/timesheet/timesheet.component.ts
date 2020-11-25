import { Component, OnInit } from '@angular/core';
import { HttpMasterService } from 'src/app/component/core/service/http-master/http-master.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../component/core/service/shared/shared.service';
import { BaseService } from 'src/app/component/core/service/base/base.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  mainResult;
  DateData;
  panelOpenState = false;
  selectedProject;
  selectedModule;
  ProjectModel;
  notificationMsg = 'Time Sheet Notification Message';
  rows = []; // array of 10 rows

  allUserData = {
    userid: '',
    full_name: '',
    email: ''
  }
  weekDateUserIdModel = {
    userID: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  }
  openTabeData: boolean;
  currentDateWeek;
  currentDateWeekJSON = {
    Mond: '',
    Tues: '',
    Wedn: '',
    Thrs: '',
    Frid: '',
    Satr: '',
    Sund: '',
    currentdate: '',
    currentday: ''
  }

  serverurl = 'https://api.tms.gindowa.com';

  displayedColumns: string[] = ['rowNo', 'project', 'module', 'subModule', 'task',
    'remarks', 'monday', 'tuesday', 'wednesday',
    'thrusday', 'friday', 'saturday', 'sunday'];
  dataSource;

  allData: any;

  constructor(
    public httpMaster: HttpMasterService,
    public route: ActivatedRoute,
    public shared: SharedService,
    public base: BaseService
  ) {

  }

  async ngOnInit(): Promise<void> {

    await this.getProject();
    this.dataSource = this.rows;

    this.currentWeekDate();
    this.allData = this.shared.getUserData();
    this.allUserData.userid = this.allData.data.rows[0].user_id;
    this.allUserData.full_name = this.allData.data.rows[0].full_name;
    this.allUserData.email = this.allData.data.rows[0].email;

    this.weekDateUserIdModel.userID = this.allData.data.rows[0].user_id;
    this.getTMSData();
  }

  async currentWeekDate() {
    let url = this.base.getBaseUrl() + '/test/current/dateweek';
    let payload = '';
    this.currentDateWeek = await this.httpMaster.postRequest(url, payload);


    this.currentDateWeekJSON.Mond = this.currentDateWeek.data.rows[0].Mon.substring(0, 10);
    this.currentDateWeekJSON.Tues = this.currentDateWeek.data.rows[0].Tue.substring(0, 10);
    this.currentDateWeekJSON.Wedn = this.currentDateWeek.data.rows[0].Wed.substring(0, 10);
    this.currentDateWeekJSON.Thrs = this.currentDateWeek.data.rows[0].Thr.substring(0, 10);
    this.currentDateWeekJSON.Frid = this.currentDateWeek.data.rows[0].Fri.substring(0, 10);
    this.currentDateWeekJSON.Satr = this.currentDateWeek.data.rows[0].Sat.substring(0, 10);
    this.currentDateWeekJSON.Sund = this.currentDateWeek.data.rows[0].Sun.substring(0, 10);
    this.currentDateWeekJSON.currentdate = this.currentDateWeek.data.rows[0].current_date.substring(0, 10);
    this.currentDateWeekJSON.currentday = this.currentDateWeek.data.rows[0].Day;
  }


  async getProject() {
    let resData;
    let projectArray = [];
    let getTSSUrl = '';
    let rowCount = 10;
    let payload = {};
    try {
      getTSSUrl = this.base.getBaseUrl() + '/test/time_sheet/project';
      resData = await this.httpMaster.postRequest(getTSSUrl, payload);

      // // check for proper api call
      if (resData.status != '1' || resData.data.rows.length <= 0) {
        throw new Error('No project data found : ' + JSON.stringify(resData));
      }

      // fill projectArray from response data
      for (let i = 0; i < resData.data.rows.length; i++) {
        projectArray.push(resData.data.rows[i].project);
      }

      for (let i = 0; i < rowCount; i++) {
        const newRow = {
          rowNo: 0,
          start_date: '',
          current_date: '',
          end_date: '',
          projects: [],
          modules: [],
          sub_modules: [],
          tasks: [],
          project: '',
          module: '',
          sub_module: '',
          task: '',
          remarks: '',
          mon: '0',
          tue: '0',
          wed: '0',
          thu: '0',
          fri: '0',
          sat: '0',
          sun: '0',
        }
        // new row, set projtes, push in rows array, set rowNo = i
        newRow.rowNo = i;
        newRow.projects = [...projectArray]
        this.rows.push(newRow);
        // alert('rows::' + JSON.stringify(this.rows));
      }

    } catch (error) {
      alert('error:::' + error);
    }
  }

  async projectChangeEvent(rowNo, project) {
    this.selectedProject = project;
    let resData;
    let moduleArray = [];
    let getMOdulesUrl = '';
    let newRow;
    let payload;
    try {
      newRow = this.rows[rowNo];
      payload = {
        projectName: project
      }
      getMOdulesUrl = this.base.getBaseUrl() + '/test/time_sheet/module';
      resData = await this.httpMaster.postRequest(getMOdulesUrl, payload);

      // check for proper api call
      if (resData.status != '1' || resData.data.rows.length <= 0) {
        throw new Error('No project data found : ' + JSON.stringify(resData));
      }

      // fill projectArray from response data
      for (let i = 0; i < resData.data.rows.length; i++) {
        moduleArray.push(resData.data.rows[i].module);
      }
      this.rows[rowNo].modules = [...moduleArray];
      // this.rows[rowNo] = newRow;
      // newRow.modules = [...moduleArray];
      // this.rows.push(newRow);
    } catch (error) {

    }
  }


  async ModuleChangeEvent(rowNo, module) {
    let project = this.selectedProject;
    this.selectedModule = module;
    let resData;
    let submoduleArray = [];
    let getsubMOdulesUrl = '';
    let newRow;
    let payload;
    try {
      newRow = this.rows[rowNo];
      payload = {
        projectName: project,
        moduleee: module
      }
      getsubMOdulesUrl = this.base.getBaseUrl() + '/test/time_sheet/submodule';
      resData = await this.httpMaster.postRequest(getsubMOdulesUrl, payload);

      // check for proper api call
      if (resData.status != '1' || resData.data.rows.length <= 0) {
        throw new Error('No project data found : ' + JSON.stringify(resData));
      }

      // fill projectArray from response data
      for (let i = 0; i < resData.data.rows.length; i++) {
        submoduleArray.push(resData.data.rows[i].sub_module);
      }
      this.rows[rowNo].sub_modules = [...submoduleArray];
      // newRow.sub_modules = [...submoduleArray];
      // this.rows.push(newRow);
    } catch (error) {

    }
  }

  async subModuleChangeEvent(rowNo, sub_module) {
    let project = this.selectedProject;
    let module = this.selectedModule;
    let resData;
    let taskArray = [];
    let gettaskUrl = '';
    let newRow;
    let payload;
    try {
      newRow = this.rows[rowNo];
      payload = {
        projectName: project,
        moduleee: module,
        submodule: sub_module

      }
      gettaskUrl = this.base.getBaseUrl() + '/test/time_sheet/task';
      resData = await this.httpMaster.postRequest(gettaskUrl, payload);

      // check for proper api call
      if (resData.status != '1' || resData.data.rows.length <= 0) {
        throw new Error('No project data found : ' + JSON.stringify(resData));
      }

      // fill projectArray from response data
      for (let i = 0; i < resData.data.rows.length; i++) {
        taskArray.push(resData.data.rows[i].task);
      }
      this.rows[rowNo].tasks = [...taskArray];
      // newRow.tasks = [...taskArray];
      // this.rows.push(newRow);
    } catch (error) {

    }

  }

  openTable = async () => {
    this.openTabeData = true;
    alert('datasourse::' + JSON.stringify(this.dataSource));
  }

  closeTable = async () => {
    this.openTabeData = false;
    alert('datasourse::' + JSON.stringify(this.dataSource));
  }

  async submitClick() {
    let model = {};
    let resData;
    let postdetailsURL;
    try {

      model = {
        user_id: this.allUserData.userid,
        currentDate: this.currentDateWeekJSON.currentdate,
        rows: this.rows,
        monday: this.currentDateWeekJSON.Mond,
        tuesday: this.currentDateWeekJSON.Tues,
        wednesday: this.currentDateWeekJSON.Wedn,
        thrusday: this.currentDateWeekJSON.Thrs,
        friday: this.currentDateWeekJSON.Frid,
        saturday: this.currentDateWeekJSON.Satr,
        sunday: this.currentDateWeekJSON.Sund
      }
      postdetailsURL = this.base.getBaseUrl() + '/test/time_sheet/data';
      resData = await this.httpMaster.postRequest(postdetailsURL, model);

      alert('Response: ' + JSON.stringify(resData));
    } catch (error) {
      alert('submitClick: ' + error);
    }
  }
  async getTMSData() {
    try {
      let url = this.base.getBaseUrl() + '/test/current/dateweek';
      let postURL = this.base.getBaseUrl() + '/test/get/tms/data/onload';

      let payload = '';
      this.DateData = await this.httpMaster.postRequest(url, payload);
      this.weekDateUserIdModel.monday = this.DateData.data.rows[0].Mon;
      this.weekDateUserIdModel.tuesday = this.DateData.data.rows[0].Tue;
      this.weekDateUserIdModel.wednesday = this.DateData.data.rows[0].Wed;
      this.weekDateUserIdModel.thursday = this.DateData.data.rows[0].Thr;
      this.weekDateUserIdModel.friday = this.DateData.data.rows[0].Fri;
      this.weekDateUserIdModel.saturday = this.DateData.data.rows[0].Sat;
      this.weekDateUserIdModel.sunday = this.DateData.data.rows[0].Sun;

      this.mainResult = await this.httpMaster.postRequest(postURL, this.weekDateUserIdModel);
      
      console.log("MainResult: " + JSON.stringify(this.mainResult));
    } catch (error) {
      alert("getTMSData: " + error);
    }
  }

}
