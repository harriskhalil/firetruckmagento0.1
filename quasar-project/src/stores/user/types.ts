import User from 'stores/UserModel';
import BlogType from 'stores/blog/BlogType'
export default interface State{
  users ?: User,
  blogs ?: BlogType,
}
