<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn-dropdown  color="blue"  dropdown-icon="change_history">
            <q-list class="bg-blue-4  ">
              <q-item class=" " clickable v-close-popup @click="onItemClick">
                <q-item-section >
                  <q-item-label >Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {mapActions} from "pinia";
import {useUserStore} from "stores/Users/UserStore";

const linksList = [
  {
    title: 'User',
    caption: 'User Crud',
    icon: 'person',
    link: 'crud'
  },
  {
    title: 'blog',
    caption: 'Blog crud with laravel Api',
    icon: 'code',
    link: 'blog'
  },

];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods:{
    ...mapActions(useUserStore,['logout']),
    onItemClick(){
      this.logout();
    }
  }
});
</script>
