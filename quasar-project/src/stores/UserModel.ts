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
