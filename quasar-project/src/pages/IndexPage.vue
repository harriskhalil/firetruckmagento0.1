<template>
<!--  <div class="relative bg-gray-800">-->
<!--    <div class="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">-->
<!--      <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply" alt="" />-->
<!--    </div>-->
<!--    <div class="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">-->
<!--      <div class="md:ml-auto md:w-1/2 md:pl-10">-->
<!--        <h2 class="text-base font-semibold uppercase tracking-wider text-gray-300">Award winning support</h2>-->
<!--        <p class="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">We’re here to help</p>-->
<!--        <p class="mt-3 text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.</p>-->
<!--        <div class="mt-8">-->
<!--          <div class="inline-flex rounded-md shadow">-->
<!--            <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">-->
<!--              Visit the help center-->
<!--              <ExternalLinkIcon class="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />-->
<!--            </a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="relative py-16 bg-white">
    <div class="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block" aria-hidden="true" />
    <div class="max-w-7xl mx-auto bg-indigo-600 lg:bg-transparent lg:px-8">
      <div class="lg:grid lg:grid-cols-12">
        <div class="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
          <div class="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden" aria-hidden="true" />
          <div class="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
            <div class="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
              <img class="object-cover object-center rounded-3xl shadow-2xl" src="https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80" alt="" />
            </div>
          </div>
        </div>

        <div class="relative bg-indigo-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
          <div class="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block" aria-hidden="true">
            <svg class="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-indigo-500" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>
            <svg class="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
              <defs>
                <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-indigo-500" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
            </svg>
          </div>
          <div class="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
            <h2 class="text-3xl font-extrabold text-white" id="join-heading">Join our team</h2>
            <p class="text-lg text-white">Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.</p>
            <a class="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-indigo-700 hover:bg-gray-50 sm:inline-block sm:w-auto" href="#">Explore open positions</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ExternalLinkIcon, StarIcon } from '@heroicons/vue/solid'
export default defineComponent({
  name: 'IndexPage',
  components:{ExternalLinkIcon},
  setup() {
  },

});
</script>
<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
