export interface LoginUser {
  username:string;
  password:string;
}

export interface LoginResponse{
  id:number;
  code:string;
  message:string;
  token:string;
  role:string;
}
