<template>
  <q-page padding class="bg-color " >
    <div class="row q-col-gutter-sm page-title">
      <div class="col-12">
        <div class="page-title text-h5 q-ma-md text-center text-white">
          {{ this.$route.params.id ? 'Edit User' : 'Add User' }}
        </div>
      </div>
    </div>


    <form @submit.prevent="AddUpdateUser" class="full-width q-gutter-md">
      <div class="row q-ml-none q-col-gutter-sm ">
        <q-card  class="col-xs-12 col-sm-6 col-md-6 offset-sm-3 offset-md-3 " >
          <q-card-section>
                                          <!-- Add users-->
            <div v-if="this.$route.path === '/user/add'">
              <q-input
                ref="first_name"
                type="text"
                filled
                v-model="user.fname"
                label="First Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="last_name"
                type="text"
                filled
                v-model="user.lname"
                label="Last Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="username"
                type="text"
                filled
                v-model="user.username"
                label="User Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="email"
                type="text"
                filled
                v-model="user.email"
                label="Email *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="avatar"
                type="text"
                filled
                v-model="user.avatar"
                label="avatar *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />

            </div>


                                      <!-- Update users-->
            <div v-if="users && users.user" >
              <q-input
                ref="first_name"
                type="text"
                filled
                v-model="users.user.fname"
                label="First Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />

              <q-input
                ref="last_name"
                type="text"
                filled
                v-model="users.user.lname"
                label="Last Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
              <q-input
                ref="email"
                type="text"
                filled
                v-model="users.user.username"
                label="Email *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type something']"
              />
            </div>
            <div class="row q-col-gutter-sm q-ml-none">
              <div class="col-xs-12 col-md-4 offset-md-1">
                <q-btn label=" " icon="people" type="submit" color="green" class="q-py-md full-width">
                  {{ this.$route.params.id ? 'Update User' : 'Add User' }}
                </q-btn>
              </div>
              <div class="col-xs-12 col-md-4 offset-md-2">
                <q-btn @click="customerCancelLink" label="Cancel"  icon="cancel" color="red" class="q-py-md full-width" />
              </div>

            </div>
          </q-card-section>
        </q-card>

      </div>
    </form>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from "pinia";
import {useUserStore} from "stores/user/UserStore";
import {Loading, Notify} from "quasar";
export default defineComponent({
  data () {
    return {
      user:{
        fname:'',
        lname:'',
        username:'',
        email:'',
        avatar:'https://www.mecallapi.com/users/12.png'
      }
    }
  },
  methods:{
    ...mapActions(useUserStore,['ShowSingleUser','UpdateUser','AddUser']),
    async AddUpdateUser(users :any){
      if (this.$route.params.id){
        Loading.show()
        await this.UpdateUser(this.users)
        this.$router.push('/crud')
        Loading.hide()
      }else{
        try{
          Loading.show()
          await this.AddUser(this.user)
          Loading.hide()
          this.$router.push('/crud')

        }catch (e){
          var err = JSON.parse(JSON.stringify(e))
          var da= JSON.parse(err.config.data)
          if (da || da.fname || da.lname || da.username || da.email || da.avatar ==''){
            Notify.create({
              position: 'top',
              color: 'negative',
              message: 'please Enter all the data'
            })
          }
          Loading.hide()
        }

      }
    },
    customerCancelLink(){
      if (this.$route.path == '/edit/user/'+this.$route.params.id ){
        this.$router.push('/crud')
      }else if(this.$route.path == '/user/add'){
        this.$router.push('/crud')
      }
    }

  },
  computed:{
    ...mapState(useUserStore,['users'])
  },
  async created(){

    if (this.$route.params.id){
      Loading.show()
      await this.ShowSingleUser(this.$route.params.id)
      Loading.hide()
    }
  }

})
</script>

