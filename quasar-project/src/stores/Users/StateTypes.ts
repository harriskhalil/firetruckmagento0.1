import {users} from "stores/Users/UserModel";
export default interface State{
  users?:users,
  csrftoken: null,
  userToken:  any,
}
