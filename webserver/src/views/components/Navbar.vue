<template>
  <div data-collapse="small" data-animation="default" data-duration="400" class="navbar w-nav">
    <div class=" bg-transparent">
    <div class="container w-container">
      <div class="w-full flex flex-row">

        <div class="mt-6 mx-2 flex-grow"> 
        <div class=" inline-block mx-2 ">
         
        <span>🎁  </span>
        </div>
        <router-link to="/" class='no-underline flex-grow inline text-xl text-gray-900 font-bold'> {{websiteConfig.title}} </router-link>
       </div>
 
 
       <div class="hidden lg:inline-block text-black  " >
          
         <UpperNav
          v-bind:web3Plug="web3Plug"
      
          />
       </div>


       <div class="inline-block lg:hidden  pull-right p-4"  >

         <button @click="showResponsiveMenu=!showResponsiveMenu" class="flex items-right px-3 py-2 border rounded text-black border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>

        <div v-if="showResponsiveMenu" class="w-full absolute left-0 block flex-grow lg:flex lg:items-center lg:w-auto bg-gray-200">
          <div class="text-sm lg:flex-grow">
             <AccordionNav 
             v-bind:web3Plug="web3Plug"
             
             />

          </div>

        </div>

       </div>

      </div>

    </div>
    </div>
  </div>
</template>


<script>
const websiteConfig = require('../../config/websiteConfig.json')
import UpperNav from './UpperNav.vue';
import AccordionNav from './AccordionNav.vue';
export default {
  name: 'Navbar',
  props: ['web3Plug' ],
  components: {UpperNav,AccordionNav},
  data() {
    return {
      websiteConfig: websiteConfig,
      showResponsiveMenu: false,
    }
  },
  methods: {
  }
}
</script>