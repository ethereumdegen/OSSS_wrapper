<template>
  <nav role="navigation" class="w-full m-2 p-2 flex flex-row">
    <div class="w-full lg:w-auto block lg:inline-block" v-for="item in navConfig.dropdowns" :key="item.title">
    <t-dropdown  class="w-full" >
      <div
        slot="trigger"
        slot-scope="{
          mousedownHandler,
          focusHandler,
          blurHandler,
          keydownHandler,
          isShown
        }"
      >
        <button
          class="flex text-md  p-2 m-1 mx-2 text-gray-900 items-center pr-3 bg-transparent focus:outline-none focus:shadow-solid transition duration-150 ease-in-out border-2 border-gray-200"
          :class="{ 'border-gray-300 bg-gray-500 text-white ': isShown }"
          aria-label="User menu"
          aria-haspopup="true"
          @mousedown="mousedownHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @keydown="keydownHandler"
        >

            <span class="px-2">{{item.title}}</span> <i class="fas fa-caret-down "></i>
        </button>
      </div>

      <div slot-scope="{ hide, blurHandler }" class="origin-top-right border-black border-2 absolute right-0 w-56 shadow-lg text-md bg-gray-200 text-gray-900">

        <a
        :href="row.url"
        v-for="row in item.rows"
       
        :key="row.title"
        class="block w-full px-4 py-2 no-underline text-black leading-5 hover:bg-gray-600 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
        @blur="blurHandler"
        >
          {{ row.title }}
        </a>


      </div>
    </t-dropdown>




  </div>


      <div class="inline-block">
        <div v-if="web3Plug.connectedToWeb3() == false" @click="connectToWeb3" class="button bg-blue-500 hover:bg-blue-700 text-sm text-black font-bold my-2 py-1 px-2 rounded cursor-pointer">Login with Web3</div>

        <div v-if="web3Plug.connectedToWeb3() "   class="truncate  text-gray-800 p-2" style="max-width:250px;  ">

        <Web3NetButton
           v-bind:providerNetworkID="activeNetworkId"
           v-bind:web3Plug='web3Plug' 
         />

          <span class="  " style="max-width:120px">
          <a   v-bind:href="getEtherscanBaseURL()+'/address/'+web3Plug.getActiveAccountAddress()" class="text-gray-800  "   target="_blank">  {{web3Plug.getActiveAccountAddress()}} </a>
         </span>
         </div>
      </div>

</nav>
</template>


<script>
import Web3NetButton from './Web3NetButton.vue'
import Config from '../config/UpperNav.js'
export default {
  name: 'UpperNav',
  props: ['web3Plug'  ],
  components:{Web3NetButton},
  data() {
    return {
      activeAccountAddress:null,
      activeNetworkId: null,
      navConfig: null 
    }
  },
  created(){
    this.navConfig = Config;
    this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
          console.log('stateChanged',connectionState);
          this.activeAccountAddress = connectionState.activeAccountAddress
          this.activeNetworkId = connectionState.activeNetworkId
           this.$forceUpdate();
        }.bind(this));

   
  },
  methods: {
        
          connectToWeb3(){
            this.web3Plug.connectWeb3( )
          },
          getEtherscanBaseURL(){
              if(this.activeNetworkId == 42){
                return  'https://kovan.etherscan.io'
              }
              return 'https://etherscan.io'
          },
  }
}
</script>