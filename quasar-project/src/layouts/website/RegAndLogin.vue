<template>
  <div class="h-screen  bg-gray-200">
    <router-view />
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'RegAndLogin',

  setup() {
  }
})
</script>
<style scoped>
/*.h-screen{*/
/*  height: 164vh;*/
/*}*/
</style>
