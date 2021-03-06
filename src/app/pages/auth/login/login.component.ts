import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  submitted = false;
  //message error api
  errorsMessage:string;

  constructor(private authService : AuthService, private router : Router) {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    });

    this.loginPayload = {
      email : '',
      password : ''
     }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  onRedirectRegistration(){
    this.router.navigateByUrl('/register');
  }

  onSubmit() {
    this.loginPayload.email = this.loginForm.get('email').value;
    this.loginPayload.password = this.loginForm.get('password').value;
    console.log("loginPayload : "+this.loginPayload.password+" + "+this.loginPayload.email);
    
    this.authService.login(this.loginPayload).subscribe(data => {
      if(data){
        console.log('login success');
        this.router.navigateByUrl('/home');
      } else {
        console.log("login Failed");
      }
    },error => {
      console.log('register failed');

      this.errorsMessage = error.error.message;
    });
  }
}
