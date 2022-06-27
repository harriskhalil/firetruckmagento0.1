import axios from 'axios';
import {useBlogStore} from "stores/blog/BlogStore";
import {Notify} from "quasar";
export const actions ={
  async getBlog(){
    const state = useBlogStore()
    await axios.get('http://127.0.0.1:8000/api/blog').then((res)=>{
      state.blogs = res.data.data
    })
  },
  async DeleteBlog(blogId:any){
    const state= useBlogStore()
    await axios.delete('http://127.0.0.1:8000/api/blog/'+blogId).then((res)=>{
      console.log(res)
    if(res.status === 200){
        Notify.create({
           position: 'top',
           color:'positive',
           message:res.data.message
        })
       var blogData :any= state.blogs
        blogData.forEach(function (item:any,index:any,object:any){
          if (item.id== blogId){
            object.splice(index,1)
          }
        })
    }
    })




    // var userData :any= state.users
    // userData.forEach(function (item:any,index:any,object:any){
    //   if (item.id== userId){
    //     object.splice(index,1)
    //     Notify.create({
    //       position:'top',
    //       color:'green',
    //       message:'user with an id of '+userId+' has been deleted'
    //     })
    //   }
    // })
  }
}
