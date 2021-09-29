<template>

<div>

   <div class="section  bg-white border-b-2 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
       />
     </div>


   </div>

   


      <div class=" section  mb-4">
        <div class="autospacing w-container">
          <div> File not found! </div>
          <router-link to="/"> -> Go Home</router-link>

          </div>
      </div>

  <Footer/>

    

 

</div>
</template>


<script>



import Web3Plug from '../js/web3-plug.js' 


import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';

import BidPacketHelper from '../js/bidpacket-helper.js'





export default {
  name: 'NotFound',
  props: [],
  components: {Navbar, Footer},
  data() {
    return {
      web3Plug: new Web3Plug() ,
      bidPacketData: {} 
    }
  },
  created: function () {
    this.web3Plug.reconnectWeb()
    this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
        
      }.bind(this));
   
      this.fetchPacketData(this.$route.params.signature)
  }, 
  methods: {
      
  }
}
</script>
