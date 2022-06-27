import BlogType from './BlogType';
import State from "stores/user/types";
export const state = () :State => {
  return {
    blogs: new BlogType()
  }
};
