<template>
  <div class="section py-4 text-white h-full" style="background: #1d1e26; min-height: 250px;">
    <div class=" h-full ">
      <div class=" flex lg:flex-row h-full">
         <div class="lg:w-1/4 ">
         </div>
        <div class="w-1/2 lg:w-1/4 flex flex-col">
          <h3 class=" text-lg font-bold ">Documentation</h3>

          <a v-bind:href="'https://etherscan.io/address/'+wrappingContractAddress" target="_blank" class="no-underline inline-block text-sm text-gray-200 hover:text-purple-300 ">Wrapper Contract</a>
              
              
          </div>
        <div class="w-1/2 lg:w-1/4 flex flex-col hidden">
          <h3 class=" text-lg font-bold ">Community &amp; Social</h3>
          
         
         </div>


      </div>
    </div>
  </div>
</template>


<script>

let merkleConfig = require('../../config/merkleConfig.json')

let websiteConfig = require('../../config/websiteConfig.json')

export default {
  name: 'Footer',
  props: [],
  data() {
    return { 
 
      wrappingContractAddress: websiteConfig.wrappingContractAddress

    }
  },
  created(){

  },
  methods: {

  }
}
</script>
