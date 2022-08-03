import BlogType from './BlogModel';
import State from "stores/blog/types";

export const state = () :State => {
  return {
    blogs: new BlogType(),
  }
};
