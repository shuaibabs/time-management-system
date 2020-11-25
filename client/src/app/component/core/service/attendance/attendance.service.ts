import { Injectable } from '@angular/core';
import { HttpMasterService } from '../http-master/http-master.service';
import { BaseService } from '../base/base.service';
import { stringify } from 'querystring';
import { JsonpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  result2: Promise<any>;
  details: any;
  ELEMENT_DATA: any;
  openTabeData: boolean;

  constructor(
    public httpMaster: HttpMasterService,
    public base: BaseService
  ) { }

  async checkIN(payload) {
    let path = '';
    let result;
    let url;
    try {
      path = '/test/ams/check_IN';
      url = this.base.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }
  }

  async checkOut(payload) {
    let path = '';
    let result;
    let url;
    try {
      path = '/test/ams/check_out';
      url = this.base.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }

  }
  async checkOut2(payload) {
    let path = '';
    let result;
    let url;
    try {
      path = '/test/ams/check_out2';
      url = this.base.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }

  }

  async getEmployeeTable(payload) {
    let path = '';
    let result;
    let url;
    try {
      path = '/test/ams/getusertable';
      url = this.base.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }

  }


  async getEmployeedetails() {
    let path = '';
    let result;
    let url;
    let payload;
    try {
      path = '/test/ams/getdetails';
      url = this.base.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }

  }


}
