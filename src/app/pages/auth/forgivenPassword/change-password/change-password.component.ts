import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { RegisterPlayload } from '../../../../model/register-playload';
import { AuthService } from '../../../../services/auth/auth.service';
import { MustMatch } from '../../../../_helper/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  registerPlayload: RegisterPlayload;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  //message error api
  errorsMessage:string;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, 
              private authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.initRegForm();
    //this.registerPlayload.email = this.activatedRoute.snapshot.params.email;
      /*this.activatedRoute.paramMap.subscribe(params => {
        const email = params.get('email');
        //if (id && id > 0) {
        console.log(email);
        //}
      });*/

      this.registerPlayload = 
      {
        username: '',
        email: this.activatedRoute.snapshot.params.email,
        password: '',
        confirmPassword: ''
      };
    
  }

  initRegForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  onSubmit(){
    this.submitted = true;
    
    this.registerPlayload.password = this.changePasswordForm.get('password').value;
    this.registerPlayload.confirmPassword = this.changePasswordForm.get('confirmpassword').value;

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.authService.changePassword(this.registerPlayload).subscribe(data =>{
      console.log('change succes');
      this.router.navigateByUrl("/register-success");
    }, error => {
      console.log('change failed');

      this.errorsMessage = error.error.message;
    });
  }

}
