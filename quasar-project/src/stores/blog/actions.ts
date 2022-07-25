import {useBlogStore} from "stores/blog/BlogStore";
import {Loading, Notify} from "quasar";
import {api} from "boot/axios";
export const actions ={
  async getBlog(){
    const state = useBlogStore()
    await api.get('api/blog').then((res)=>{
      // console.log(res.data.data.last_page_url)
      state.blogs = res.data.data
    })
  },
  async DeleteBlog(blogId:any){
    const state= useBlogStore()
    await api.delete('http://127.0.0.1:8000/api/blog/'+blogId).then((res)=>{
    if(res.status === 200){
        Notify.create({
           position: 'top',
           color:'positive',
           message:'blog with an id of '+blogId+' has been deleted'
        })
       var blogData :any= state.blogs
        blogData.forEach(function (item:any,index:any,object:any){
          if (item.id== blogId){
            object.splice(index,1)
          }
        })
    }
    })
  },
  async UpdateBlog(blogId:any){
    const state = useBlogStore()
    await api.put('http://127.0.0.1:8000/api/blog/'+blogId.id,{
      title: blogId.title,
      excerpt:blogId.excerpt,
      paragraph: blogId.paragraph
    }).then((res)=>{
      if (res.status === 200){
        Notify.create({
          position:'top',
          color:'positive',
          message:res.data.message
        })
        // this.$router.push()
      }
      return Promise.resolve(res)

    }).catch((error)=>{
      Loading.hide()
      if (error.response !== undefined && error.response.data !== undefined && error.response.data.errors !== undefined) {
        let liError = '';
        for (const [key, err] of Object.entries(error.response.data.errors)) {
          //@ts-ignore
          liError = liError + `<li>${key} : ${err[0]}</li>`;
        }
        Notify.create({
          color: 'negative',
          position: 'top',
          message: liError,
          html: true,
          icon: 'report_problem'
        })
      }

      // let message = error.message
      // if (error.response !== undefined && error.response.data !== undefined && error.response.data.message !== undefined) {
      //   message = error.response.data.message
      //   if (error.response.status === 401 || message == 'Unauthenticated.') {
      //
      //     // this.$router.push('/auth/login')
      //   }
      // }

      // Notify.create({
      //   color: 'negative',
      //   position: 'top',
      //   message: 'Something went wrong: ' + message,
      //   icon: 'report_problem'
      // })
      return Promise.reject(error);

    })
  },
  async AddBlog(blogData:any){
    const state= useBlogStore();
    await api.post('http://127.0.0.1:8000/api/blog',{
      title: blogData.title,
      excerpt: blogData.excerpt,
      paragraph: blogData.paragraph
    }).then((res)=>{
      if (res.status === 200){
        Notify.create({
          position:'top',
          color:'positive',
          message:res.data.message
        })

        var blog_data = state.blogs
        if (Array.isArray(blog_data)){
          blog_data.push(res.data.data)
        }

      }

      return Promise.resolve(res)
    }).catch((error)=>{
      Loading.hide()
      if (error.response !== undefined && error.response.data !== undefined && error.response.data.errors !== undefined) {
        let liError  = '';
        for (const [key, err] of Object.entries(error.response.data.errors)) {
          //@ts-ignore
          liError  = liError + `<li>${key} : ${err[0]}</li>`;
          console.log(liError)
        }
        Notify.create({
          color: 'negative',
          position: 'top',
          message: liError,
          html: true,
          icon: 'report_problem'
        })
      }
      return Promise.reject(error);

    })
  }
}

























// async function DeleteBlog(blogId:any) {
//   return await apiRequest({url: 'blog/' + blogId, method: 'DELETE'})
//     .then(response => {
//       return Promise.resolve(response.data.data);
//     }).catch(error => {
//       console.log("ERROR" + error)
//       return Promise.reject(error)
//     })
// }
// export async function apiRequest( data :any) {
//   //data.url = context.state.api.url + '/api/' + data.url;
//
//   if (!data.loading) {
//     Loading.show()
//   }
//   return await api.request({
//     method: data.method,
//     url: '/api/' + data.url,
//     data: data.data,
//     params: data.method.toLowerCase() == "get" ? data.data : null,
//     responseType: data.responseType ? data.responseType : 'json',
//     headers: data.headers ?? {
//       "Content-type": "application/json",
//       "Accept": "application/json"
//     }
//   }).then(response => {
//     if (!data.loading) {
//       Loading.hide()
//     }
//     if (typeof data.success === 'function') {
//       //@ts-ignore
//       return data.success(response, this.$router)
//     }
//     return Promise.resolve(response)
//   }).catch(error => {
//     if (!data.loading) {
//       Loading.hide()
//     }
//     if (error.response !== undefined && error.response.data !== undefined && error.response.data.errors !== undefined) {
//       let liError = '';
//       for (const [key, err] of Object.entries(error.response.data.errors)) {
//         //@ts-ignore
//         liError = liError + `<li>${key} : ${err[0]}</li>`;
//       }
//       Notify.create({
//         color: 'negative',
//         position: 'top',
//         message: liError,
//         html: true,
//         icon: 'report_problem'
//       })
//     }
//     let message = error.message
//     if (error.response !== undefined && error.response.data !== undefined && error.response.data.message !== undefined) {
//       message = error.response.data.message
//       if (error.response.status === 401 || message == 'Unauthenticated.') {
//         //@ts-ignore
//         this.$router.push('/auth/login')
//       }
//     }
//
//     Notify.create({
//       color: 'negative',
//       position: 'top',
//       message: 'Something went wrong: ' + message,
//       icon: 'report_problem'
//     })
//
//     return Promise.reject(error);
//   })
// }











