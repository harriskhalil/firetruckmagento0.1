import State from 'stores/StateTypes'
import Users from "stores/Users/UserModel";
import {LocalStorage} from "quasar";
export const state = () :State => {
  return {
    users: new Users(),
    // users: LocalStorage.has('user') ? LocalStorage.getItem('user') : null,
    //use the above one if you are not using typescript
    csrftoken: null,
    userToken: LocalStorage.has('userToken') ? LocalStorage.getItem('userToken') : null,
  }
};
