import {useUserStore} from "stores/Users/UserStore";
import axios from "axios";
import {Loading, LocalStorage, Notify} from "quasar";
import {api} from "boot/axios";

export const actions ={

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
        if (!data.loading) {
          Loading.hide();
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
            // context.commit("ruchang/unsetUser", null, { root: true });
            localStorage.removeItem('users')
            //@ts-ignore
            context.users=null
            // context.commit("ruchang/unsetUserToken", null, { root: true });
            localStorage.removeItem('userToken')
            context.userToken=null
            //@ts-ignore
            // this.$router.push("/auth/login");
            window.location.href = "/auth/login";
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
        let resData = {};
        //@ts-ignore
        resData[data.objName] = response.data;
        // context.commit("ruchang/setPageData", resData, { root: true });
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
  },
  async register( data:any) {
    const context= useUserStore()
    return await this.apiRequest({
        url: "auth/register",
        method: "POST",
        data: data,
      })
      .then((response) => {
        context.users=response.data
        if (response.data.user =='null'){
          response.data= null
        }
        if (response.data.access_token == 'null'){
          response.data.access_token=null
        }
        LocalStorage.set('userToken',response.data.access_token)
        context.userToken= response.data.access_token

        Notify.create({
          color: "green",
          position: "top",
          message: response.data.message,
        });

        // this.$router.push("/");
        window.location.href = "/";

        return Promise.resolve(response);
      })
      .catch((error) => {
        console.log("ERROR" + error);
        return Promise.reject(error);
      });
  },
  async  login( data:any) {
    const context= useUserStore()
    return await this.apiRequest(
        {
          url: "auth/login",
          method: "POST",
          data: data,
        })
      .then((response) => {
        if (response.data.user == 'null'){
          LocalStorage.set('user', response.data.user);
        }
        if (response.data.access_token == 'null'){
          response.data.access_token=null
        }
        LocalStorage.set('userToken',response.data.access_token)

        Notify.create({
          color: "green",
          position: "top",
          message: response.data.message,
        });
        window.location.href = "/blog";
        // this.$router.push("/index");
        return Promise.resolve(response);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
  },
  async logout(){
    const state = useUserStore();
    console.log('got in logout')
  },
  async getcsrftoken_status(token :any){
    const state = useUserStore();
    state.csrftoken= token
  },

  async socialite_login(data:any){
    const context = useUserStore();
    return await this.apiRequest(
      {
        url: "auth/social_login/login",
        method: "GET",
        data: data,
      })
      .then((response)=>{
        console.log(response)
        context.userToken= response.data.token
        context.users= response.data.user;
        LocalStorage.set('userToken',response.data.access_token)
        Notify.create({
          color: "green",
          position: "top",
          message: response.data.message,
        });
        window.location.href = "/blog";
        // this.$router.push("/index");
        return Promise.resolve(response);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        return Promise.reject(error);
      });
  },
  async login_redirect(){
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < 40; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=' + '460033831801-e6067tud46k2bg2him5iusgcgoi6n9id.apps.googleusercontent.com' + '&redirect_uri=http://localhost:8080/auth/googlecallback&scope=openid+profile+email&response_type=code&state=' + result;
  }




}
