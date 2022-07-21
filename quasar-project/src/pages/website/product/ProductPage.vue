<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-xl font-bold text-gray-900">Customers also bought</h2>
      <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" @click="ChangeRoute(product.href)">
          <div class="relative">
            <div class="relative w-full h-72 rounded-lg overflow-hidden">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="w-full h-full object-center object-cover" />
            </div>
            <div class="relative mt-4">
              <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
            </div>
            <div class="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
              <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
              <p class="relative text-lg font-semibold text-white">{{ product.price }}</p>
            </div>
          </div>
          <div class="mt-6">
            <a :href="product.href" class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
              Add to Cart<span class="sr-only">, {{ product.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import {Dialog, DialogPanel, RadioGroup, RadioGroupLabel, RadioGroupOption, TransitionChild, TransitionRoot,} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
export default defineComponent({
  name: 'ProductPage',
  components:{Dialog, DialogPanel, RadioGroup, RadioGroupLabel, RadioGroupOption, TransitionChild, TransitionRoot,XIcon,StarIcon},
  data(){
    return{
      products:[
        {
          id: 1,
          name: 'Zip Tote Basket',
          price: '$220',
          rating: 3.9,
          href: '/website/product-detail',
          description:
            'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
          imageAlt: 'Back angled view with bag open and handles to the side.',
          colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
          ],
        },
        {
          id: 2,
          name: 'Zip Tote Basket',
          price: '$220',
          rating: 3.9,
          href: '/website/product-detail',
          description:
            'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
          imageAlt: 'Back angled view with bag open and handles to the side.',
          colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
          ],
        },
        {
          id: 3,
          name: 'Zip Tote Basket',
          price: '$220',
          rating: 3.9,
          href: '/website/product-detail',
          description:
            'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
          imageAlt: 'Back angled view with bag open and handles to the side.',
          colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
          ],
        }
      ],
    }
  },
  methods:{
    ChangeRoute(path){
      this.$router.push(path)
    }
  }
})
</script>



