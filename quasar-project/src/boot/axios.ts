import {boot} from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import {Cookies, LocalStorage} from "quasar";
import {useUserStore} from "stores/Users/UserStore";
import {actions} from "stores/Users/actions";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://127.0.0.1:8000/' });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.defaults.withCredentials = true
  api.interceptors.request.use(async (config) =>{
    const state = useUserStore();
    if ((!state.userToken || state.csrftoken === null || state.csrftoken ==='null')  && config.url != 'sanctum/csrf-cookie'){
      await api.get("sanctum/csrf-cookie").then((res)=>{
        actions.getcsrftoken_status(Cookies.get("XSRF-TOKEN"))
      })
    }

    config.headers["X-XSRF-TOKEN"] = state.csrftoken;
    let token = LocalStorage.getItem("userToken");
    if (token && token != null && token != undefined && token != "null") {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  })
  api.interceptors.response.use( async  response =>{
    return Promise.resolve(response)
  },error => {
    if (error.response.status ===401){
      actions.logout()
    }
    return Promise.reject(error)
  })

});

export { api };
