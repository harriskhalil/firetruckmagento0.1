import axios from 'axios';
import {useUserStore} from 'stores/user/UserStore'
export const actions = {
  async  getUser() {
    const state = useUserStore()
    await axios.get('https://www.mecallapi.com/api/users').then((res)=>{
      state.users = res.data

    }).catch(error =>{
      console.log(error)
    })
  },

}
