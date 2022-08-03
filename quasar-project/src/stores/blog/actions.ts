import {useBlogStore} from "stores/blog/BlogStore";
import {Loading, Notify} from "quasar";
import {api} from "boot/axios";
import {useUserStore} from "stores/Users/UserStore";
import {log} from "util";
export const actions ={
  //mother of all functions
  async apiRequest( data :any) :Promise<any>{
    const context = useUserStore()
    if (!data.loading) {
      Loading.show();
    }
    return await api
      .request({
        method: data.method,
        url: "http://127.0.0.1:8000/api/" + data.url,
        data: data.data,
        params: data.method.toLowerCase() == "get" ? data.data : null,
        responseType: data.responseType ? data.responseType : "json",
        headers: data.headers ? data.headers : {},
      })

      .then((response) => {
        console.log(response)
        if (!data.loading) {
          Loading.hide();
        }
        if (response.status ===200 && response.status!= null && response.data.message){
          Notify.create({
            position: 'top',
            color:'positive',
            message:response.data.message
          })
        }
        if (typeof data.success === "function") {

          //@ts-ignore
          return data.success(response);
          // return data.success(response, this.$router);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        if (!data.loading) {
          Loading.hide();
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.errors !== undefined
        ) {
          let liError = "";
          for (const [key, err] of Object.entries(error.response.data.errors)) {
            //@ts-ignore
            liError = liError + `<li>${key} : ${err[0]}</li>`;
          }
          Notify.create({
            color: "negative",
            position: "top",
            message: liError,
            html: true,
            icon: "report_problem",
          });
        }
        let message = error.message;
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.message !== undefined
        ) {
          message = error.response.data.message;
          if (error.response.status === 401 || message == "Unauthenticated.") {
            localStorage.removeItem('users')
            //@ts-ignore
            context.users=null
            localStorage.removeItem('userToken')
            context.userToken=null
            //@ts-ignore
            // this.$router.push("/auth/login");
            window.location.href = "/website/login";
          }
        }

        Notify.create({
          color: "negative",
          position: "top",
          message: "Something went wrong: " + message,
          icon: "report_problem",
        });

        return Promise.reject(error);
      });
  },
  async  fetchApiBlog( ) {
    const state= useBlogStore()
    return await this.apiRequest(
      {
        url: 'blog',
        method: "GET",
        // data: data.data ? data.data : {},
      }
    )
      .then((response) => {
        console.log(response)
        // if (data.store_name == 'blogs' ){
        //   state.blogs = response.data.data
        // }
        state.blogs = response.data.data
        let resData = {};
        //@ts-ignore
        resData[data.objName] = response.data;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
  },
  async  FetchSingleBlog( data:any) {
    const state= useBlogStore()
    return await this.apiRequest(
      {
        url: 'blog/'+data,
        method: "GET",
        data: data.data ? data.data : {},
      }
    )
      .then((response) => {
        let resData = {};
        //@ts-ignore
        resData[data.objName] = response.data;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
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
  },
  async postApiUpdateBlog( data:any) {
    const state= useBlogStore();
    return await this.apiRequest(
      {
        url: 'blog/'+data.id,
        method: 'PUT',
        data: data? data: {},
        // headers: data.headers ? data.headers : {},
      },
    )
      .then((response) => {
        // //@ts-ignore
        // let index = state.blogs.data.findIndex((blog:any)=> blog.id ==response.data.data.id)
        //
        // if(index !== -1) {
        //   //@ts-ignore
        //   state.blogs.data[index] = response.data.data
        // }
        //@ts-ignore
        let blogData :any= state.blogs.data;
        //@ts-ignore
        blogData.forEach(function (item:any,index:any,object:any){
          if (item.id== response.data.data.id){
            //@ts-ignore
            state.blogs.data[index] = response.data.data;
          }
        });
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
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
      //@ts-ignore
       var blogData :any= state.blogs.data
        blogData.forEach(function (item:any,index:any,object:any){
          if (item.id== blogId){
            object.splice(index,1)
          }
        })
    }
    })
  },
  //used in the datatable for backend search
  async WatchapiRequest( data :any) :Promise<any>{
    const context = useUserStore()
    const state = useBlogStore()
    if (!data.loading) {
      Loading.show();
    }
    return await api
      .request({
        method: data.method,
        url: "http://127.0.0.1:8000/api/" + data.url,
        data: data.data,
        params: data.method.toLowerCase() == "get" ? data.data : null,
        responseType: data.responseType ? data.responseType : "json",
        headers: data.headers ? data.headers : {},
      })

      .then((response) => {
        if (!data.loading) {
          Loading.hide();
        }
        console.log(data)
        if (data.data.store_name == 'blogs' ){
          state.blogs = response.data.data
        }
        if (typeof data.success === "function") {
          //@ts-ignore
          return data.success(response);
          // return data.success(response, this.$router);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        if (!data.loading) {
          Loading.hide();
        }
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.errors !== undefined
        ) {
          let liError = "";
          for (const [key, err] of Object.entries(error.response.data.errors)) {
            //@ts-ignore
            liError = liError + `<li>${key} : ${err[0]}</li>`;
          }
          Notify.create({
            color: "negative",
            position: "top",
            message: liError,
            html: true,
            icon: "report_problem",
          });
        }
        let message = error.message;
        if (
          error.response !== undefined &&
          error.response.data !== undefined &&
          error.response.data.message !== undefined
        ) {
          message = error.response.data.message;
          if (error.response.status === 401 || message == "Unauthenticated.") {
            localStorage.removeItem('users')
            //@ts-ignore
            context.users=null
            localStorage.removeItem('userToken')
            context.userToken=null
            //@ts-ignore
            // this.$router.push("/auth/login");
            window.location.href = "/website/login";
          }
        }

        Notify.create({
          color: "negative",
          position: "top",
          message: "Something went wrong: " + message,
          icon: "report_problem",
        });

        return Promise.reject(error);
      });
  },
  //useless for now
  async  fetchApi( data:any) {
    const context= useUserStore()
    return await this.apiRequest(
      {
        url: data.url,
        method: "GET",
        data: data.data ? data.data : {},
      }
    )
      .then((response) => {
        console.log(response)
        let resData = {};
        //@ts-ignore
        resData[data.objName] = response.data;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
  },
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











