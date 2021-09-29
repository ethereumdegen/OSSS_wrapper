<template>

<div>

   <div class="section  bg-gray-200  border-b-2 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug" 
       />
     </div>


   </div>

  

   <div class="section   border-b-2 border-black text-white" style="background:#222;">
     <div class="py-16 w-container">
        
       <div class="w-column">
           
         

          <div  class=" "  >
  
                
              <div class="text-lg text-center">
                ⛏️ The Miners Guild DAO is always accepting of help ⛏️
              </div>
              <div class="text-sm text-center">
                Here are some ways you can contribute!
              </div> 
             </div>


              <div  class=" flex flex-col lg:flex-row "  >

                    <div class="p-4 ">
                      <div class="ul mt-16">
                        <div class="li mt-8">
                        - Improve the Website <a href="https://github.com/admazzola/minersguild-web" target="_blank"> Frontend Code! 
                                      </a> </div> 

                        <div class="li mt-8">
                        - Promote Dapps which are contributing fees to the Miners Guild DAO!
                        </div> 
                        <div class="li mt-8">
                        - Launch an Ethereum Smart Contract which pays fees to the Miners Guild DAO Contract during execution flow!
                        </div> 
                            
                      </div> <!-- ul --> 
                    </div> 
               <div class="px-16 py-16">
                 
                 <img src="@/assets/images/mining.gif" />
                 </div> 
               </div> 
          
           </div>
     </div>
   </div>


    


    
  <Footer/>

</div>
</template>


<script>



import NotConnectedToWeb3 from './components/NotConnectedToWeb3.vue'

import Web3Plug from '../js/web3-plug.js'  

 

import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
import GenericTable from './components/GenericTable.vue';
 

import MathHelper from '../js/math-helper.js'

import StarflaskAPIHelper from '../js/starflask-api-helper.js'

import FrontendHelper from '../js/frontend-helper.js'

export default {
  name: 'Contribute',
  props: [],
  components: {Navbar, Footer, TabsBar, GenericTable, NotConnectedToWeb3},
  data() {
    return {
      web3Plug: new Web3Plug() 
     
       
    
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', async function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId
       
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
    
 

  },
  mounted: function () {
    
     
  }, 
  methods: {
         
  }
}
</script>
