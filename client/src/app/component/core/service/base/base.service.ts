import { Injectable } from '@angular/core';
import { HttpMasterService } from '../http-master/http-master.service';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  result2: Promise<any>;
  details: any;
  ELEMENT_DATA: any;
  openTabeData: boolean;

  constructor(  public httpMaster: HttpMasterService) { }

  getBaseUrl() {
     let baseUrl = 'http://localhost:3000';
  //  let baseUrl = environment.apiBaseUrl;
    return baseUrl;
  }

  async checkIN(payload) {
    let path = '';
    let result;
    let url;
    try {
      path = '/test/ams/check_IN';
      url = this.getBaseUrl() + path;
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
      url = this.getBaseUrl() + path;
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
      path = '/test/ams/checkout2';
      url = this.getBaseUrl() + path;
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
      url = this.getBaseUrl() + path;
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
      url = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(url, payload);
      return result;
    } catch (error) {
      return error;
    }

  }


}
