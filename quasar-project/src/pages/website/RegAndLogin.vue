<template>
  <div v-if="this.$route.fullPath ==='/website/registration'" class="min-h-full flex flex-col justify-center  sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to make an account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="Register" >
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-700"> First Name </label>
            <div class="mt-1">
              <input id="firstname" v-model="user.first_name"  name="email" type="text" autocomplete="name" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label for="middlename" class="block text-sm font-medium text-gray-700"> Middle Name </label>
            <div class="mt-1">
              <input id="middlename" v-model="user.middle_name" name="email" type="text" autocomplete="name" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-700"> Last Name </label>
            <div class="mt-1">
              <input  id="lastname" v-model="user.last_name" name="email" type="text" autocomplete="name" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
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

          <div class="flex items-center justify-between">
            <div class="text-sm flex items-center">
              <a href="/website/password/email" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Or continue with </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3">
            <div>
              <a @click="Login_redirect" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Gmail</span>
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="Login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input id="email" name="email" v-model="user.email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input id="password" name="password" v-model="user.password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm flex items-center">
              <a href="/website/password/email" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div  class="relative flex justify-center text-sm">
              <span  class="px-2 bg-white text-gray-500"> Or continue with </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3">
            <div>
              <a @click="Login_redirect" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Sign in with Gmail</span>
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {users} from "stores/Users/UserModel";
import {mapActions} from "pinia";
import {useUserStore} from "stores/Users/UserStore";
export default defineComponent({
  name: 'RegistrationAndLogin',
  data(){
    const user:users={
      users_type_id:''
    }
    if (user.users_type_id === ''||user.users_type_id=== null){
      user.users_type_id=1
    }
    return{
      isPwd: ref(true),
      user
    }
  },

  methods:{
    ...mapActions(useUserStore,['register','login','login_redirect']),
    Register(){
      if (this.user.password){
        this.register(this.user)
      }else {
        this.login_redirect();
      }
    },
    Login(){
      this.login(this.user)

    },
    Login_redirect(){
      this.login_redirect();
    }
  },

})
</script>
