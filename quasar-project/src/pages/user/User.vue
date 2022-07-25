<!--<template>-->
<!--  <q-page padding>-->
<!--    &lt;!&ndash; content &ndash;&gt;-->
<!--    <div>{{getFirstName}} </div>-->
<!--    <div v-for="items in users" :key="items.id" >-->
<!--      {{items.fname}} + {{items.lname}} + {{items.username}}-->
<!--    </div>-->
<!--  </q-page>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent } from 'vue'-->
<!--import {useUserStore} from "stores/user/UserStore";-->
<!--import {mapActions, mapState} from "pinia";-->
<!--export default defineComponent({-->
<!--  name: 'User',-->
<!--  methods:{-->
<!--    ...mapActions(useUserStore,['getUser'])-->
<!--  },-->
<!--  computed:{-->
<!--    ...mapState(useUserStore,['users','getFirstName']),-->
<!--  },-->
<!--  created() {-->
<!--    this.getUser()-->
<!--  },-->
<!--})-->


<!--</script>-->
