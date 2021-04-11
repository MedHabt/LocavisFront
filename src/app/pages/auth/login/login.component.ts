import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginPayload } from '../../../model/login-payload';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginPayload : LoginPayload;

  constructor(private authService : AuthService) {
    this.loginForm = new FormGroup({
      username : new FormControl(),
      password : new FormControl()
    });

    this.loginPayload = {
      username : '',
      password : ''
     }
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    console.log("loginPayload : "+this.loginPayload.password+" + "+this.loginPayload.username);
    
    this.authService.login(this.loginPayload).subscribe(data => {
      if(data){
        console.log('login success');
      } else {
        console.log("login Failed");
      }
    })
  }
}
