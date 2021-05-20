import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPlayload } from '../../../model/register-playload';
import { AuthService } from '../../../services/auth/auth.service';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../_helper/must-match.validator'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPlayload: RegisterPlayload;
  submitted = false;
  //message error api
  errorsMessage:string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        //lastName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue]
        /*username: '',
        email: '',
        password: '',
        confirmPassword: ''*/
      }, {
        validator: MustMatch('password', 'confirmPassword')
    }
    );

    this.registerPlayload = 
      {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit(){
    this.submitted = true;

    this.registerPlayload.username = this.registerForm.get('username').value;
    this.registerPlayload.email = this.registerForm.get('email').value;
    this.registerPlayload.password = this.registerForm.get('password').value;
    this.registerPlayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerPlayload).subscribe(data =>{
      console.log('register succes');
      this.router.navigateByUrl("/register-success");
    }, error => {
      console.log('register failed');

      this.errorsMessage = error.error.message;
    });
  }
}
