<template>
  <div  class="min-h-full flex flex-col justify-center  sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Change Password</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="ResetPassword" >
          <div>
            <label for="email_regsiter" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input id="email_regsiter" v-model="user.email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password_register" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <q-input id="confirm_password" outlined v-model="user.password" dense :type="isPwd ? 'password' : 'text'"  hint="Password with toggle" class="      border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <label for="confirm_password" class="block text-sm font-medium text-gray-700">Confirm Password </label>
            <div class="mt-1">
              <q-input id="confirm_password" outlined v-model="user.confirm_password" dense :type="isPwd ? 'password' : 'text'"  hint="Password with toggle" class="      border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Change Password</button>
          </div>
        </form>


      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {mapActions} from "pinia";
import {useUserStore} from "stores/Users/UserStore";
import {users} from "stores/Users/UserModel";
export default defineComponent({
  name: 'PasswordReset',
  data(){
    const user:users={
      token:this.$route.params.token
    }

    return{
      isPwd: ref(true),
      user
    }
  },
  methods:{
    ...mapActions(useUserStore,['ChangePassword']),
    ResetPassword(){
      this.ChangePassword(this.user)
    }


  },
  created() {
    // console.log(this.$route.params.token)
  }
})
</script>
