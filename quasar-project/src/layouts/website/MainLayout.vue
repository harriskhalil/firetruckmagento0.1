<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div class="px-4 pt-5 pb-2 flex">
                <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" @click="mobileMenuOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex px-4 space-x-8">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name" v-slot="{ selected }">
                      <button :class="[selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent', 'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium']">
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name" class="px-4 py-6 space-y-12">
                    <div class="grid grid-cols-2 gap-x-4 gap-y-10">
                      <div v-for="item in category.featured" :key="item.name" class="group relative">
                        <div class="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                          <img :src="item.imageSrc" :alt="item.imageAlt" class="object-center object-cover" />
                        </div>
                        <a :href="item.href" class="mt-6 block text-sm font-medium text-gray-900">
                          <span class="absolute z-10 inset-0" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1 text-sm text-gray-500">Shop now</p>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 p-2 block font-medium text-gray-900">{{ page.name }}</a>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Create an account</a>
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 p-2 block font-medium text-gray-900">Sign in</a>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <!-- Currency selector -->
                <form>
                  <div class="inline-block">
                    <label for="mobile-currency" class="sr-only">Currency</label>
                    <div class="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                      <select id="mobile-currency" name="currency" class="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent">
                        <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                      </select>
                      <div class="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" class="w-5 h-5 text-gray-500">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Hero section -->
    <div class="relative bg-gray-900">
      <!-- Decorative image and overlay -->
      <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <img src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg" alt="" class="w-full h-full object-center object-cover" />
      </div>
      <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />

      <!-- Navigation -->
      <header class="relative z-10">
        <nav aria-label="Top">
          <!-- Top navigation -->
          <div class="bg-gray-900">
            <div class="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              <!-- Currency selector -->
              <form>
                <div >
                  <label for="desktop-currency" class="sr-only">Currency</label>
                  <div class="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
                    <select id="desktop-currency" name="currency" class="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent">
                      <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
                    </select>
                    <div class="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" class="w-5 h-5 text-gray-300">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <div class="flex items-center space-x-6">
                <a href="#" class="text-sm font-medium text-white hover:text-gray-100">Sign in</a>
                <a href="#" class="text-sm font-medium text-white hover:text-gray-100">Create an account</a>
              </div>
            </div>
          </div>

          <!-- Secondary navigation -->
          <div class="backdrop-blur-md backdrop-filter bg-grey-9  bg-white">
            <div  class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div >
                <div class="  h-16 flex items-center justify-between">
                  <!-- Logo (lg+) -->
                  <div :class="$q.screen.lt.md ?'hidden':''" class=" lg:flex-1 lg:flex lg:items-center">
                    <a href="#">
                      <span class="sr-only">Workflow</span>
                      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" />
                    </a>
                  </div>

                  <div class=" h-full lg:flex">
                    <!-- Flyout menus -->
                    <PopoverGroup :class="$q.screen.lt.md ?'hidden':''"  class="px-4 bottom-0 inset-x-0">
                      <div class="h-full flex justify-center space-x-8">
                        <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                          <div class="relative flex">
                            <PopoverButton class="relative z-10 flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium text-white">
                              {{ category.name }}
                              <span :class="[open ? 'bg-white' : '', 'absolute -bottom-px inset-x-0 h-0.5 transition ease-out duration-200']" aria-hidden="true" />
                            </PopoverButton>
                          </div>

                          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <PopoverPanel class="absolute top-full inset-x-0 text-sm text-gray-500">
                              <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                              <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div class="relative bg-white">
                                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                  <div class="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                    <div v-for="item in category.featured" :key="item.name" class="group relative">
                                      <div class="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                                        <img :src="item.imageSrc" :alt="item.imageAlt" class="object-center object-cover" />
                                      </div>
                                      <a :href="item.href" class="mt-4 block font-medium text-gray-900">
                                        <span class="absolute z-10 inset-0" aria-hidden="true" />
                                        {{ item.name }}
                                      </a>
                                      <p aria-hidden="true" class="mt-1">Shop now</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </transition>
                        </Popover>

                        <a v-for="page in navigation.pages" :key="page.name" :href="page.href" class="flex items-center text-sm font-medium text-white">{{ page.name }}</a>
                      </div>
                    </PopoverGroup>
                  </div>

                  <!-- Mobile menu and search (lg-) -->
                  <div class="flex-1 flex items-center lg:hidden">
                    <button type="button" class="-ml-2 p-2 text-white" @click="mobileMenuOpen = true">
                      <span class="sr-only">Open menu</span>
                      <MenuIcon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Search -->
                    <a href="#" class="ml-2 p-2 text-white">
                      <span class="sr-only">Search</span>
                      <SearchIcon class="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  <!--Logo (lg-) -->
                  <a href="#" class="lg:hidden">
                    <span class="sr-only">Workflow</span>
                    <img src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="" class="h-8 w-auto" />
                  </a>

                  <div class="flex-1 flex items-center justify-end">
                    <a href="#" :class="$q.screen.lt.md ?'hidden':''" class=" text-sm font-medium text-white lg:block"> Search </a>

                    <div class="flex items-center lg:ml-8">
                      <!-- Help -->
                      <a href="#" class="p-2 text-white lg:hidden">
                        <span class="sr-only">Help</span>
                        <QuestionMarkCircleIcon class="w-6 h-6" aria-hidden="true" />
                      </a>
                      <a href="#" :class="$q.screen.lt.md ?'hidden':''" class=" text-sm font-medium text-white lg:block">Help</a>

                      <!-- Cart -->
                      <div class="ml-4 flow-root lg:ml-8">
                        <a href="#" class="group -m-2 p-2 flex items-center">
                          <ShoppingBagIcon class="flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                          <span class="ml-2 text-sm font-medium text-white">0</span>
                          <span class="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
        <h1 class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">New arrivals are here</h1>
        <p class="mt-4 text-xl text-white">The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release while they're still in stock.</p>
        <a href="#" class="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100">Shop New Arrivals</a>
      </div>
    </div>
    <router-view />
    <footer aria-labelledby="footer-heading" class="bg-gray-900">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="grid grid-cols-2 gap-8 xl:col-span-2">
            <div class="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-medium text-white">Shop</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.shop" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Company</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.company" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-medium text-white">Account</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.account" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-white">Connect</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.connect" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-300 hover:text-white">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-12 md:mt-16 xl:mt-0">
            <h3 class="text-sm font-medium text-white">Sign up for our newsletter</h3>
            <p class="mt-6 text-sm text-gray-300">The latest deals and savings, sent to your inbox weekly.</p>
            <form class="mt-2 flex flex-inherit sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" type="text" autocomplete="email" required="" class="appearance-none min-w-0 w-full bg-white border border-white rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white" />
              <div class="ml-4 flex-shrink-0">
                <button type="submit" class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">Sign up</button>
              </div>
            </form>
          </div>
        </div>

        <div class="border-t border-gray-800 py-10">
          <p class="text-sm text-gray-400">Copyright &copy; 2022 Risbot Inc.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import {Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon} from "@heroicons/vue/outline";
export default defineComponent({
  name: 'IndexPage',
  components:{Tab, TabGroup, TabList, TabPanel, TabPanels,Dialog, DialogPanel, Popover,PopoverButton, PopoverGroup, PopoverPanel, TransitionChild, TransitionRoot,MenuIcon, QuestionMarkCircleIcon, SearchIcon, ShoppingBagIcon, XIcon},
  data(){
    return {
      currencies:['CAD', 'USD', 'AUD', 'EUR', 'GBP'],
      navigation: {
        categories:[
          {
            name: 'Women',
            featured: [
              {
                name: 'New Arrivals',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
              },
              {
                name: 'Basic Tees',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
              },
              {
                name: 'Accessories',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
                imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
              },
              {
                name: 'Carry',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
                imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
              },
            ],
          },
          {
            name: 'Men',
            featured: [
              {
                name: 'New Arrivals',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
                imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
              },
              {
                name: 'Basic Tees',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
                imageAlt: 'Model wearing light heather gray t-shirt.',
              },
              {
                name: 'Accessories',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
                imageAlt:
                  'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
              },
              {
                name: 'Carry',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
                imageAlt: 'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
              },
            ],
          },
        ],
        pages: [
          { name: 'Company', href: '#' },
          { name: 'Stores', href: '#' },
        ],
      },
      pages: [
        { name: 'Company', href: '#' },
        { name: 'Stores', href: '#' },
      ],
      footerNavigation :{
        shop: [
          { name: 'Bags', href: '#' },
          { name: 'Tees', href: '#' },
          { name: 'Objects', href: '#' },
          { name: 'Home Goods', href: '#' },
          { name: 'Accessories', href: '#' },
        ],
        company: [
          { name: 'Who we are', href: '#' },
          { name: 'Sustainability', href: '#' },
          { name: 'Press', href: '#' },
          { name: 'Careers', href: '#' },
          { name: 'Terms & Conditions', href: '#' },
          { name: 'Privacy', href: '#' },
        ],
        account: [
          { name: 'Manage Account', href: '#' },
          { name: 'Returns & Exchanges', href: '#' },
          { name: 'Redeem a Gift Card', href: '#' },
        ],
        connect: [
          { name: 'Contact Us', href: '#' },
          { name: 'Twitter', href: '#' },
          { name: 'Instagram', href: '#' },
          { name: 'Pinterest', href: '#' },
        ],
      },
      mobileMenuOpen : ref(false)
    }
  }

});
</script>
<style>
.flex-inherit{
  flex-wrap: inherit;
}
.none{
  display: none;
}
</style>
