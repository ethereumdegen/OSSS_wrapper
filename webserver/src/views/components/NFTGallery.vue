<template>
  <div class=" ">
      
     <div> Your owned token IDs: </div> 

  <div>
    
    <div v-for="tokenData of ownedTokenIdsArray" class="m-4 p-2 inline-block border-2 border-black">
        {{tokenData.tokenId}}

        <div v-if="tokenData.needsWrap">(Must be wrapped to sell)</div>
    </div>

    <div v-if="ownedTokenIdsArray.length ==0">
      No results found.
    </div>
    
  </div>
       
  </div>
</template>


<script>

//use THE GRAPH 

import TheGraphHelper from '../../js/the-graph-helper.js'
import NFTHelper from '../../js/nft-helper.js'

import BuyTheFloorHelper from '../../js/buythefloor-helper.js'

export default {
  name: 'NFTGallery',
  props: ['nftContractAddress', 'projectId', 'web3Plug'],
  data() {
    return {
      nftType: null,
      ownedTokenIdsArray: [] 
    }
  },
  /* watch: {
    nftContractAddress: function (contractAddress) {
       this.nftType = BuyTheFloorHelper.getNameFromContractAddress(this.nftContractAddress, this.projectId, this.web3Plug.getActiveNetId())
        
         this.fetchOwnedTokenIds()
    } ,
    projectId: function (projectId) {
       this.nftType = BuyTheFloorHelper.getNameFromContractAddress(this.nftContractAddress, this.projectId, this.web3Plug.getActiveNetId())
        
         this.fetchOwnedTokenIds()
    } 
  },*/
  mounted(){
      
      this.nftType = BuyTheFloorHelper.getNameFromContractAddress(this.nftContractAddress, this.projectId, this.web3Plug.getActiveNetId())
       

      this.fetchOwnedTokenIds()


  },
  methods: {
       async fetchOwnedTokenIds(){
          console.log('nftContractAddress', this.nftContractAddress)
          console.log('nftType', this.nftType)

          if(!this.nftType){
            this.ownedTokenIdsArray = []
            return
          }

          let activeAddress = this.web3Plug.getActiveAccountAddress()
 

        if(this.nftType.toLowerCase() == 'cryptovoxelsparcels'){
          let nftDataArray = await TheGraphHelper.findCryptovoxelsOwnedBy( activeAddress )
       
          this.ownedTokenIdsArray = nftDataArray
        }


         if(this.nftType.toLowerCase() == 'wrappedmooncats'){
          let nftDataArray = await TheGraphHelper.findMooncatsOwnedBy( activeAddress )
       
          this.ownedTokenIdsArray = nftDataArray
        }

          if(this.nftType.toLowerCase() == 'wrappedcryptopunks'){ 
          let nftDataArray = await TheGraphHelper.findWrappedPunksOwnedBy( activeAddress )
       
          this.ownedTokenIdsArray = nftDataArray
        }


         if(this.nftType.toLowerCase() == 'hashmasks'){ 
          let nftDataArray = await TheGraphHelper.findHashmasksOwnedBy( activeAddress )
       
          this.ownedTokenIdsArray = nftDataArray
        }



           
          console.log('nftDataArray',this.ownedTokenIdsArray)
          
       }
  }
}
</script>
