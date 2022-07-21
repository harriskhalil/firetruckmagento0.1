import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'user', component: () => import('pages/user/User.vue') },
      { path: 'crud', component: () => import('pages/usercrud/UserCrud.vue') },
      { path: '/edit/user/:id', component: () => import('pages/user/Form.vue') },
      { path: '/user/add', component: () => import('pages/user/Form.vue') },
      { path: '/blog', component: () => import('pages/crud/Blog.vue') },
      { path: '/blog/add', component: () => import('pages/crud/Form.vue') },
      { path: '/edit/blog/:id', component: () => import('pages/crud/Form.vue') },
    ],


  },
  {
    path:'/website/',
    component:()=> import('layouts/website/MainLayout.vue'),
    children:[
      {path: 'home',component:()=>import('pages/website/HomePage.vue')},
    ]
  },
  {
    path:'/website/',
    component:()=> import('layouts/website/RegAndLogin.vue'),
    children:[
      {path: 'registration',component:()=>import('pages/website/RegAndLogin.vue')},
      {path: 'login',component:()=>import('pages/website/RegAndLogin.vue')},
    ]
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
