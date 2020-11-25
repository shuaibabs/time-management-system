import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CryptoService }  from '../crypto/crypto.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class HttpMasterService {


  token= '';

  constructor( public http:HttpClient , public router: Router, public crypto: CryptoService , public utility: UtilService) { }

  private getHTTPOption(): any {

    const currentDate = this.utility.getDateMySQL();

    const md5Authorization = this.crypto.MD5(currentDate);

    const httpOptions = {
      headers: new HttpHeaders(
        {
          Authorization: md5Authorization,
          'Content-Type': 'application/json'
        }
      )
    }; 

    return httpOptions;
  
  }
  
  get() {

    try{

    } catch(error) {

    }
  }

  post(url, payLoad) {

    
    let encrepted = '';
    let decrepted = '';
    let body = {};

    try{

      // encrepted = this.crypto.encrypt(JSON.stringify(payLoad));
      // alert('encrepted: ' + encrepted);

      // body = {
      //   payLoad: encrepted
      // }
      this.http.post<any>(url, payLoad).subscribe(ResponseData => {
        alert('responseData: ' + JSON.stringify(ResponseData.data));
        
        decrepted = this.crypto.decrypt(ResponseData.data);
        alert('decrepted data :' + decrepted);
       
      });

    } catch(error) {

    }
  }
  async getRequest(url) {
    let asyncResult: any;
    try {
      asyncResult = await this.http.get(url).toPromise();
      console.log(asyncResult);
      return asyncResult;
      
    } catch (error) {
      alert('getRequest: ' + error);
    }
  }
  async postRequest(url, payload) {
    let asyncResult: any;

    try {
      asyncResult = await this.http.post(url, payload, this.getHTTPOption()).toPromise();
      console.log(asyncResult);
      return asyncResult;

    } catch (error) {
      alert('postRequest: ' + JSON.stringify(error));
    }
  }
}

