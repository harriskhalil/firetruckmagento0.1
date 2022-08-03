export default class blogModel {
  public id?: string;
  public title?: string ;
  public excerpt?: string;
  public paragraph?: string;
  constructor(id:string='',title:string='',excerpt:string='' , paragraph:string='') {
    this.id =id;
    this.title=title;
    this.excerpt=excerpt;
    this.paragraph=paragraph
  }
}
export interface blogs{
   id?: string;
   title?: string ;
   excerpt?: string;
   paragraph?: string;
}
