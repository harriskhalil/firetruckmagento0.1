<template>
  <q-page class="flex flex-center">
    Please wait...
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {mapActions} from "pinia";
import {useUserStore} from "stores/Users/UserStore";
export default defineComponent({
  name: 'PageAuthCallback',
  methods:{
    ...mapActions(useUserStore,['socialite_login'])
  },
  created() {
    this.socialite_login(this.$route.query);
  }
})
</script>
