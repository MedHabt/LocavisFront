import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-forgiven-password-email',
  templateUrl: './forgiven-password-email.component.html',
  styleUrls: ['./forgiven-password-email.component.css']
})
export class ForgivenPasswordEmailComponent implements OnInit {

  forgivenPasswordForm: FormGroup;
  //message error api
  Message:string;
  submitted = false;
  subbmitedSucess = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.forgivenPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  OnGoToLogin():void {
    this.router.navigateByUrl("/login");
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgivenPasswordForm.controls; }

  onSubmit(){
    this.submitted = true;

    const emailForgivenCompte = this.forgivenPasswordForm.get('email').value;
    
    if (this.forgivenPasswordForm.invalid) {
      return;
    }

    this.authService.forgivenPassword(emailForgivenCompte).subscribe(data =>{
      console.log('register succes');
      this.subbmitedSucess = true;
      this.Message = 'Please check your mail';
    }, error => {
      console.log('register failed');
      this.Message = error.error.message;
    });
  }

}
