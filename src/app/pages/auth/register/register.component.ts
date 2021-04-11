import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPlayload } from '../../../model/register-playload';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPlayload: RegisterPlayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.formBuilder.group(
      {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    );
    this.registerPlayload = 
      {
        username: '',
        email: '',
        password: '',
        confrimPassword: ''
      };

   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.registerPlayload.username = this.registerForm.get('username').value;
    this.registerPlayload.email = this.registerForm.get('email').value;
    this.registerPlayload.password = this.registerForm.get('password').value;
    this.registerPlayload.confrimPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPlayload).subscribe(data =>{
      console.log('register succes');
      this.router.navigateByUrl("/register-success");
    }, error => {
      console.log('register failed');
    });
  }
}
