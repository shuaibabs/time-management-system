import { Component, OnInit } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { HttpMasterService } from 'src/app/component/core/service/http-master/http-master.service';
import { AttendanceService } from 'src/app/component/core/service/attendance/attendance.service';
import { BaseService } from '../../component/core/service/base/base.service';
import { ok } from 'assert';
export interface PeriodicElement {
  date: string;
  check_in_DT: string;
  check_out_DT: string;
  time: string;
  time_class: string;
}

interface Cource {
  user_id: string;
  full_name: string;
  email: string;
  check_in: string;
  check_out: string;
}


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
seasons: string[] = ['Good', 'Very Good', 'Excellent'];
  notificationMsg = 'AMS Notification Message here';

  userDetails = {
    userid: '',
    name: ''
  };

Checkbox: any = [];
ShiftArr = [
  {
    "key":"ok",
    "value" :"ok"
  }
];

  openTabeData = false;
  ELEMENT_DATA = [];

  displayedColumns: string[] = ['date', 'check_in_DT', 'check_out_DT', 'time', 'time_class'];
  dataSource = this.ELEMENT_DATA;

  EmployeeCode = '';
  EmployeeCode2 = '';
  EmployeeCode3 = '';
  empData = '';
  empDetails: Cource[] = [];

  result: any;
  result2: any;

  alldata = {}
  date = '';
  check_in_DT = '';
  check_out_DT = '';
  time_class = '';

  data = [];

  // tslint:disable-next-line: variable-name

  myDate = new Date();

  resdata: any;
  responseData: any;
  user_id: any;
  details: any;
  user_id1: any;

  constructor(
    public http: HttpClient,
    public httpMaster: HttpMasterService,
    public base: BaseService
  ) {
    this.getEmpDetails();
  }

  ngOnInit(): void {
    this.openTable();
  }

  async checkbox(event) {
    this.Checkbox.push(event.target.value);
  }
  async clickCheckIn() {
    let result;
    try {
      this.EmployeeCode = this.EmployeeCode.trim().toUpperCase();
      this.validateEmpID(this.EmployeeCode);
      const code = this.EmployeeCode;
      const payload = {
        code: code
      };
      result = await this.base.checkIN(payload);
      this.getEmpDetails();
    } catch (error) {
      alert('Error:: Your Check-IN Id is Invalid please enter the correct Id');
    }
  }


 async submit() {
const hobby = this.Checkbox.toString();
if (hobby === 'ok') {
  try {

    this.EmployeeCode2 = this.EmployeeCode2.trim().toUpperCase();
    this.validateEmpID2(this.EmployeeCode2);
    const code = this.EmployeeCode2;
    const payload = {
      code: code
    };
    this.result2 = await this.base.checkOut2(payload);
    this.getEmpDetails();

  } catch (error) {

  }
} else {
  try {
    this.EmployeeCode2 = this.EmployeeCode2.trim().toUpperCase();
    this.validateEmpID2(this.EmployeeCode2);
    const code = this.EmployeeCode2;
    const payload = {
      code: code
    };
    this.result2 = await this.base.checkOut(payload);
    this.getEmpDetails();

  } catch (error) {

  }
}
 }
  validateEmpID(EmployeeCode) {

    try {
      // rule for checking the length
      if (EmployeeCode.trim().length !== 7) {
        throw new Error('Invalid LENGTH of Employee ID exact 7 chars are required.');
      }
      // rule for check of first three chars
    } catch (error) {
      throw error;
    }
  }


  validateEmpID2(EmployeeCode2) {

    try {
      // rule for checking the length
      if (EmployeeCode2.trim().length !== 7) {
        throw new Error('Invalid LENGTH of Employee ID exact 7 chars are required.');
      }
      // rule for check of first three chars
    } catch (error) {
      alert('error::  Your Check-IN Id is Invalid please enter the correct Id');
    }
  }

  async getEmpData(emp) {
    this.closeTable();
    this.ELEMENT_DATA.length = 0;
    this.empData = JSON.stringify(emp);

    const userdata = JSON.parse(JSON.parse(JSON.stringify(this.empData)));
    this.userDetails.name = userdata.full_name;
    this.userDetails.userid = userdata.user_id;
    this.user_id1 = userdata.user_id;

    let payload = {
      user_id: this.user_id1
    }
   this.details = await this.base.getEmployeeTable(payload);
    for (let i = 0; i < Object.keys(this.details.data.rows).length; i++) {
      const models = {
        date: this.details.data.rows[i].date.substring(0, 10),
        check_in_DT: this.details.data.rows[i].check_in_dt.substring(11, 19),
        check_out_DT: this.details.data.rows[i].check_out_dt.substring(11, 19),
        time: this.details.data.rows[i].time.substring(0, 5),
        time_class: this.details.data.rows[i].time_class
      };
      this.ELEMENT_DATA.push(models);
      // alert(this.empData);
      this.openTable();
    }
  }

  async getEmpDetails() {
    this.result = await this.base.getEmployeedetails();
    this.empDetails.length = 0;
    for (let i = 0; i < this.result.data.rows.length; i++) {
      const model = {
        user_id: this.result.data.rows[i].user_id,
        full_name: this.result.data.rows[i].full_name,
        email: this.result.data.rows[i].email,
        check_in: this.result.data.rows[i].check_in,
        check_out: this.result.data.rows[i].check_out
      };
      this.empDetails.push(model);
    }

  }
  openTable = async () => {
    this.openTabeData = true;
  }
  closeTable = async () => {
    this.openTabeData = false;
  }

  refresh() {
    this.openTable();
    this.closeTable();
  }

}
