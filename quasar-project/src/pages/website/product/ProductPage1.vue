<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 id="products-heading" class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
        <a v-for="product in products" :key="product.id" :href="product.href" class="group">
          <div class="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="w-full h-full object-center object-cover group-hover:opacity-75" />
          </div>
          <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
            <h3>
              {{ product.name }}
            </h3>
            <p>
              {{ product.price }}
            </p>
          </div>
          <p class="mt-1 text-sm italic text-gray-500">
            {{ product.description }}
          </p>
          <div class="mt-6">
            <a :href="product.href" class="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
              Add to Cart<span class="sr-only">, {{ product.name }}</span>
            </a>
          </div>
        </a>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductPage',
  data(){
    return{
      products:[
        {
          id: 1,
          name: 'Focus Paper Refill',
          href: '/website/product-detail',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 2,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 2,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 3,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 4,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 5,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 6,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 7,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 8,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$13',
          description: '3 sizes available',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
      ]
    }
  }
})
</script>
