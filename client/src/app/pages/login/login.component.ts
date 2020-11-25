import { Component, OnInit, Injectable, } from '@angular/core';
import { LoginService } from 'src/app/component/core/service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg;

  data = {
    username: '',
    password: ''
  };

  images = [
    '../../assets/images/img.png'
  ];

  constructor(public login: LoginService , public router: Router ) { }

  ngOnInit(): void {
  }

  async login_click() {
    let username = '';
    let password = '';
    let payLoad = {};
    
    try {
      username = this.data.username;
      password = this.data.password;
      payLoad = {
        username: username,
        password: password
      };

      const errorMsg = await this.login.get_signin(payLoad);

    } catch (error) {
      alert('login_click: ' + JSON.stringify(error));
    }

  }
}
