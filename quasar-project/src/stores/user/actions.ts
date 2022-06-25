import axios from 'axios';
import {useUserStore} from 'stores/user/UserStore'
import {Notify} from "quasar";
export const actions = {
  async  getUser() {
    const state = useUserStore()
    await axios.get('https://www.mecallapi.com/api/users').then((res)=>{
      state.users = res.data

    }).catch(error =>{
      console.log(error)
    })
  },

  async ShowSingleUser(users:any){
    const state = useUserStore()
    await axios.get(' https://www.mecallapi.com/api/users/'+ users).then((res)=>{
      state.users = res.data
    })
  },

  async UpdateUser(user :any){
    const state= useUserStore()
    await axios.put('https://www.mecallapi.com/api/users/update',{
      id:user.user.id,
      fname:user.user.fname,
      lname:user.user.lname,
      username: user.user.username
    }).then((res)=>{
      if (res.data.status =='error'){

        Notify.create({
          position: 'top',
          color: 'negative',
          message: res.data.message
        })
      }else {
        Notify.create({
          position: 'top',
          color: 'positive',
          message: res.data.message
        })
      }
    }).catch((err)=>{
      if (err){
        Notify.create({
          position:'top',
          color:'warning',
          message:err.message
        })
      }
    })
  },
  async AddUser(user:any){
    const state = useUserStore()
    await axios.post('https://www.mecallapi.com/api/users/create',{
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }).then((res)=>{
      if (res.data.status =='ok'){
        Notify.create({
          position:'top',
          color:'positive',
          message:res.data.message
        })
      }else
        {

        Notify.create({
          position:'top',
          color:'red',
          message:res.data.message
        })
      }
    })
  }
}
