export default  class User  {
  public id?: string;
  public fname?: string ;
  public lname?: string;
  public username?: string;
  public  avatar?: string;
  constructor(id:string='',fname:string='',lname:string='' , username:string='', avatar:string='') {
    this.id =id;
    this.fname=fname;
    this.lname=lname;
    this.username=username;
    this.avatar=avatar
  }
}

export interface Users{
   id?:string;
   first_name?:string;
   middle_name?:string;
   last_name?:string;
   email?: string;
   password?:string;
   confirm_password?:string
}
