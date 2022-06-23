export const getters ={
  getFirstName(state :any){
       if(state.users && state.users.length) {
         return    state.users.find((user:any) => user?.fname == 'Karn')
       } else {
         return  state.users
       }
  },

}
