import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { LoginResponse, LoginUser } from '../models/login-user.model';
import { BASE_URL } from './Api';

const API  = BASE_URL+"/api";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticated = false;
  mmDelivery = false;
  token:string = '';
  constructor(private http:HttpClient,
              private router: Router){}

  loadToken()
  {
    console.log("loadToken here");

    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    console.log("this is role "+role);
    if(token)
    {
      this.setAuthentication(token);
      this.setMmDelivery(role);
    }

  }

  isMmDelivery()
  {
    return this.mmDelivery;
  }


  isAuthenticated()
  {
    return this.authenticated;
  }

  setMmDelivery(role:any)
  {
    if (role == 'mm-delivery') {
      this.mmDelivery = true;
    } else {
      this.mmDelivery = false;
    }

  }

  setAuthentication(token:string)
  {
    this.token = token;
    this.authenticated = true;
  }

  getToken()
  {
    return this.token;
  }

  login(data:LoginUser)
  {
    return this.http.post<LoginResponse>(API+'/login',data);
  }

  logout()
  {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    this.token = "";

    this.authenticated = false;
    this.router.navigate(["/login"]);
  }
}
