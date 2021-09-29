<template>

<div>

   <div class="section  bg-gray-200  border-b-4 border-black px-0 lg:px-1">

     <div class=" ">
        <Navbar 
        v-bind:web3Plug="web3Plug"
        
       />
     </div>


   </div>

   
 <div class="section  text-white  border-b-2 border-black hidden" style="background:#222;">
     <div class="w-container  ">

         

          <div class=" w-2/3   py-2" style="margin: 0 auto;">
           
               <img  src="@/assets/images/banner.jpg" />
                
         </div>

        
         


     </div>
   </div>


    <div class="section  text-white  border-b-2 border-black " v-if="!signedInToWeb3" style="background:#222;">
     <div class="w-container  ">

         

          <div class=" w-2/3  mt-8 py-32" style="margin: 0 auto;">
           
                <div> Sign in to web3 to wrap your NFTs. </div>

                 
                <div>
                  <div v-if="web3Plug.connectedToWeb3() == false" @click="connectToWeb3" class="button inline-block bg-blue-500 hover:bg-blue-700 text-sm text-black font-bold my-2 py-1 px-2 rounded cursor-pointer">Login with Web3</div>
                </div>

                
         </div>

        
         


     </div>
   </div>


    <div class="section  text-white  border-b-2 border-black " v-if="signedInToWeb3" style="background:#222;">
     <div class="w-container  ">

         

          <div class=" w-2/3  mt-8 py-8" style="margin: 0 auto;">
           
                <div class="text-2xl text-center"> Wrap your {{  websiteConfig.nftName  }} </div>

                  <div class="flex flex-col my-2">
                    <label> Legacy Token Id </label>
                     <input type="numeric" v-model="tokenIdToWrap" class="text-black p-2 my-2" style="width:200px"/>    
                  </div>

                  <div v-if="!isApproved" class="mb-8 bg-green-500 select-none hover:bg-green-300  cursor-pointer rounded p-4 text-black border-2 border-black inline-block" @click="approveAllToWrapper()"> Approve All </div>

                 <div v-if="isApproved" class="mb-8 bg-yellow-500 select-none hover:bg-yellow-300  cursor-pointer rounded p-4 text-black border-2 border-black inline-block" @click="wrap()"> Wrap </div>
         </div>

        
         


     </div>
   </div>



     <div class="section  text-white  border-b-2 border-black " v-if="signedInToWeb3" style="background:#222;">
     <div class="w-container  ">

         

          <div class=" w-2/3  mt-8 py-8" style="margin: 0 auto;">
           
                <div class="text-2xl text-center"> Unwrap your {{  websiteConfig.nftName  }} </div>

               
                  <div class="flex flex-col my-2">
                    <label> Wrapped Token Id </label>
                     <input type="numeric" v-model="tokenIdToUnwrap" class="text-black p-2 my-2" style="width:200px"/>    
                  </div>

                 <div class="mb-8 bg-yellow-500 select-none hover:bg-yellow-300 cursor-pointer rounded p-4 text-black border-2 border-black inline-block" @click="unwrap()"> Unwrap </div>
         </div>

        
         


     </div>
   </div>



    
  <Footer
    v-bind:web3Plug="web3Plug"
  />

</div>
</template>


<script>



import Web3Plug from '../js/web3-plug.js'  
 
 
import Navbar from './components/Navbar.vue';
 
import Footer from './components/Footer.vue';
import TabsBar from './components/TabsBar.vue';
   
import FrontendHelper from '../js/frontend-helper.js';

import Web3 from 'web3'


const ERC721ABI = require('../contracts/ERC721ABI.json')

const WrappedNFTABI = require('../contracts/WrappedNonFungibleTokenABI.json')

const websiteConfig = require('../config/websiteConfig')
const merkleConfig = require('../config/merkleConfig')

const { MerkleTree } = require('merkletreejs') 
const keccak256 = require('keccak256');




export default {
  name: 'Home',
  props: [],
  components: {Navbar, Footer },
  data() {
    return {
      web3Plug: new Web3Plug() , 
      signedInToWeb3: false,
      websiteConfig: websiteConfig,
      merkleConfig:merkleConfig,
       
      isApproved: false,


      tokenIdToWrap: 0,
      tokenIdToUnwrap: 0 
      
    }
  },

  created(){

 
    this.web3Plug.getPlugEventEmitter().on('stateChanged', function(connectionState) {
        console.log('stateChanged',connectionState);
         
        this.activeAccountAddress = connectionState.activeAccountAddress
        this.activeNetworkId = connectionState.activeNetworkId 

        this.signedInToWeb3 =  (this.activeAccountAddress != null)
         
      }.bind(this));
   this.web3Plug.getPlugEventEmitter().on('error', function(errormessage) {
        console.error('error',errormessage);
         
        this.web3error = errormessage
       
      }.bind(this));

      this.web3Plug.reconnectWeb()
   
 
       

  },
  mounted: function () {
    this.getApproval()
    
    setInterval(  this.getApproval.bind(this), 5000  )
  }, 
  methods: {

          connectToWeb3(){
            this.web3Plug.connectWeb3( )
          },

          async getApproval(){

            const legacyNFTContract = this.web3Plug.getCustomContract(  ERC721ABI , merkleConfig.contractData.address )


            let isApproved = await legacyNFTContract.methods.isApprovedForAll( this.activeAccountAddress, websiteConfig.wrappingContractAddress ).call()

            let uri = await legacyNFTContract.methods.uri( "74465914949626719004819234140270633285428984010557290271986606391704869142529" ).call()

              console.log(' uri '  , uri )

            this.isApproved = isApproved

            console.log(' is approved' , this.isApproved)
          },


          async approveAllToWrapper() {

            const legacyNFTContract = this.web3Plug.getCustomContract(  ERC721ABI , merkleConfig.contractData.address )

            await legacyNFTContract.methods.setApprovalForAll( websiteConfig.wrappingContractAddress, true  )

            await this.getApproval()
          },
        

          wrap( ){
            

              let tokenId = parseInt( this.tokenIdToWrap )     
               

              let userAddress = this.web3Plug.getActiveAccountAddress()

              const wrappingContract = this.web3Plug.getCustomContract(  WrappedNFTABI , websiteConfig.wrappingContractAddress )

             // let merkleProof = 


              const leaves = merkleConfig.tokenIds.map((x) => Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', x ) ))
              const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
              
              const hexRoot = tree.getHexRoot()
              
              console.log('hex root is ', hexRoot)
  

              const leaf = Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', tokenId )   )
              
              const hexproof = tree.getHexProof(leaf)

              console.log(tree.verify(hexproof, leaf, hexRoot)) // true
            



              wrappingContract.methods.wrapWithProof( tokenId, hexproof ).send({from: userAddress })
          },  
        

         unwrap( ){
            

               let tokenId = parseInt( this.tokenIdToUnwrap )     
               

              let userAddress = this.web3Plug.getActiveAccountAddress()

              const wrappingContract = this.web3Plug.getCustomContract(  WrappedNFTABI , websiteConfig.wrappingContractAddress )

              
              wrappingContract.methods.unwrap(tokenId).send({from: userAddress })
          },  
 

  }
}
</script>
