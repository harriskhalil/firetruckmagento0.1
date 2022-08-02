import {useBlogStore} from "stores/blog/BlogStore";

export const getters ={
  getAllBlogs(){
    const state :any= useBlogStore();
    return state.blogs
  }
}
