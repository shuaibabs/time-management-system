import { Injectable } from '@angular/core';
import { HttpMasterService } from '../http-master/http-master.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isLoginSuccess = false;
  constructor(
    public httpMaster: HttpMasterService,
    public router: Router,
    public shared: SharedService,
    public base: BaseService
  ) { }

  async get_signin(payLoad) {
    let url;
    let path = '';
    let data;
    try {
      path = '/test/tms/login';
      url = this.base.getBaseUrl() + path;
      data = await this.httpMaster.postRequest(url, payLoad);

      console.log('UserID:::' + JSON.stringify(data.data.rows[0].user_id));
      console.log('Data:::' + JSON.stringify(data));

      if (data.status === 1) {
        this.router.navigate(['/home']);
        this.shared.setUserData(JSON.stringify(data));
      } else {
        throw new Error ('Login failed: ' + JSON.stringify(data));
      }

    } catch (error) {
      return alert('your user_id/password is invalid please enter the correct user_id password ');
    }
  }
}
