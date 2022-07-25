import {LocalStorage} from "quasar";

export default class Users{
  public first_name?:string;
  public middle_name?:string;
  public last_name?:string;
  public email?: string;
  public password?:string;
  public confirm_password?:string
  public access_token?:any
  constructor( first_name:string='', middle_name:string='', last_name:string='', email: string='', password:string='', confirm_password:string='',access_token:any=LocalStorage.has('user') ? LocalStorage.getItem('user') : null) {
    this.first_name=first_name;
    this.middle_name=middle_name;
    this.last_name=last_name;
    this.email=email;
    this.password=password;
    this.confirm_password=confirm_password
    this.access_token= access_token
  }
}



export interface users{
  first_name?:string;
  middle_name?:string;
  last_name?:string;
  email?: string;
  password?:string;
  confirm_password?:string;
  users_type_id?:any
}
