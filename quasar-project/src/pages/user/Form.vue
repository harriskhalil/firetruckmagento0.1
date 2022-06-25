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
import {Loading} from "quasar";
export default defineComponent({
  data () {
    return {
    }
  },
  methods:{
    ...mapActions(useUserStore,['ShowSingleUser','UpdateUser']),
    async AddUpdateUser(users :any){
      if (this.$route.params.id){
        Loading.show()
        await this.UpdateUser(this.users)
        Loading.hide()
      }
    },
    customerCancelLink(){
      if (this.$route.path == '/edit/user/'+this.$route.params.id ){
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

