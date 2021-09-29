<template>
  <div class="inline-block button text-gray-200  bg-gray-900 hover:bg-gray-700   font-bold py-0 px-1 rounded cursor-pointer">
    <div class="text-green-500 text-xl inline capitalize " style=" text-shadow: 0px 0px 2px #66dd00; ">  ·  </div>{{getNetworkName()}}
  </div>
</template>


<script>
export default {
  name: 'Web3NetButton',
  props: ['web3Plug',"providerNetworkID"],
  components: {},
  data() {
    return {
      showResponsiveMenu: false
    }
  },
   mounted: async function()
  { 
      //this is required because vue cant detect changes otherwise 
     this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
        this.$forceUpdate();
      }.bind(this));
  },
  
  methods: {
    getNetworkName(){
  
      return this.web3Plug.getWeb3NetworkName( this.web3Plug.getActiveNetId() )
    }
  }
}
</script>