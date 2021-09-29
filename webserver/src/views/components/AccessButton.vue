<template>
<div class="inline-block">
  <div v-if="signedIn==false" @click="signIn" class="  button text-gray-200  bg-gray-900 hover:bg-gray-700   font-bold py-2 px-2 rounded cursor-pointer">
     Sign In 
  </div>

  <div v-if="signedIn==true"  @click="signOut" class=" button text-gray-800 border-2 border-black bg-gray-100 hover:bg-gray-200 text-sm   py-2 px-2 rounded cursor-pointer">
     Sign Out
  </div>
</div>
</template>


<script>
export default {
  name: 'AccessButton',
  props: ['accessPlug','web3Plug','providerNetworkID' ],
  components: {},
  data() {
    return {
      showResponsiveMenu: false,
      signedIn: false
    }
  },
   created: async function()
  { 
      //this is required because vue cant detect changes otherwise 
      this.accessPlug.getPlugEventEmitter().on('stateChanged', function(accessState) {
          console.log('accessState',accessState);
          this.signedIn = accessState.isConnected 
          this.$forceUpdate();
        }.bind(this));
  },
  
  methods: {
    signIn(){
      this.accessPlug.connect(this.web3Plug)
    },

    signOut(){
      this.accessPlug.signOut(this.web3Plug)
    }
   
  }
}
</script>