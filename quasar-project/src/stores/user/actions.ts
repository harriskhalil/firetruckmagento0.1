
import {useUserStore} from 'stores/user/UserStore'
import {Notify} from "quasar";
import User from "stores/UserModel";
import {api} from "boot/axios";
export const actions = {
  async  getUser() {
    const state = useUserStore()
    await api.get('https://www.mecallapi.com/api/users').then((res)=>{
      state.users = res.data

    }).catch(error =>{
      console.log(error)
    })
  },

  async ShowSingleUser(users:any){
    const state = useUserStore()
    await api.get(' https://www.mecallapi.com/api/users/'+users).then((res)=>{
      state.users = res.data
    })
  },

  async UpdateUser(user :any){
    const state= useUserStore()
    await api.put('https://www.mecallapi.com/api/users/update',{
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
    await api.post('https://www.mecallapi.com/api/users/create',{
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
  },
  async DeleteUser(userId:any){
    const state= useUserStore()
    // here the api was not working for some reason
    //so i just changed the state
    //if api was correct then we would do something like this




    // await api.delete('https://www.mecallapi.com/api/users/delete'+userId).then((res)=>{
    // if(res.data.status === 200){
    //     Notify.create({
    //        position: 'top',
    //        color:'red',
    //        message:res.data.message
    //     })
    //    now we can use this line of code to update our state
    //    var userData :any= state.users
    //     userData.forEach(function (item:any,index:any,object:any){
    //       if (item.id== userId){
    //         object.splice(index,1)
    //       }
    //     })
    // }
    // })




    var userData :any= state.users
    userData.forEach(function (item:any,index:any,object:any){
      if (item.id== userId){
        object.splice(index,1)
        Notify.create({
          position:'top',
          color:'green',
          message:'user with an id of '+userId+' has been deleted'
        })
      }
    })
  }
}
