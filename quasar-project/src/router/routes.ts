import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'blog', component: () => import('pages/crud/Blog.vue') },
      { path: '/blog/add', component: () => import('pages/crud/Form.vue') },
      { path: '/edit/blog/:id', component: () => import('pages/crud/Form.vue') },

    ],


  },
  {
    path:'/website/',
    component:()=> import('layouts/website/MainLayout.vue'),
    children:[
      {path: 'home',component:()=>import('pages/website/HomePage.vue')},
      {path: 'product',component:()=>import('pages/website/product/ProductPage.vue')},
      {path: 'product1',component:()=>import('pages/website/product/ProductPage1.vue')},
      {path: 'product-detail',component:()=>import('pages/website/product/ProductDetail.vue')},
      {path: 'checkout',component:()=>import('pages/website/checkout/CheckOut.vue')},
      // {path: 'password/reset/:token',component:()=>import('pages/Auth/PasswordReset.vue')},

    ]
  },
  {
    path:'/website/',
    component:()=> import('layouts/website/RegAndLogin.vue'),
    children:[
      {path: 'registration',component:()=>import('pages/website/RegAndLogin.vue')},
      {path: 'login',component:()=>import('pages/website/RegAndLogin.vue')},
      {path: 'password/email',component:()=>import('pages/Auth/PasswordReset.vue')},
      {path: 'password/reset/:token',component:()=>import('pages/Auth/ChangePassword.vue')},
    ]
  },
  {
    path: '/auth/',
    component: () => import('layouts/website/RegAndLogin.vue'),
    children: [
      { path: 'googlecallback', component: () => import('pages/Auth/Callback.vue') },
      { path: 'logout', component: () => import('pages/Auth/Logout.vue') },
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
