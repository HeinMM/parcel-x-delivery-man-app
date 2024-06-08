import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/login-user.model';
import { Router } from '@angular/router';
import { log } from 'console';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  redirectUrl:string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    console.log("isAuthenticated ",this.authService.isAuthenticated());

    if(this.authService.isAuthenticated())
      {
        this.router.navigate(['/home']);
      }

  }

  get email()
  {
    return this.loginForm.controls.email;
  }
  get password()
  {
    return this.loginForm.controls.password;
  }

  onSubmit()
  {
    let loginData:any = this.loginForm.value;
    this.authService.login(loginData).subscribe(
      (data:LoginResponse)=>{

        this.loginOk(data);
      }
    )
  }

  private loginOk(response:LoginResponse) {


    console.log(response);

    localStorage.setItem("id", response.id.toString());
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);

    if(response.code != "200"){

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return alert("please check your email or password");
    }

    this.authService.setAuthentication(response.token);

    if(this.redirectUrl)
      {
        this.router.navigate([this.redirectUrl]);
      }
      else {
        this.router.navigate(['/home']);
      }

  }

}
