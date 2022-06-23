import State from './types'
import User from "stores/UserModel";
export const state = () :State => {
  return {
    users: new User()
  }
};
