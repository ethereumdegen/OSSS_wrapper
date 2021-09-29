/*
BID PACKET UTIL for NODEJS
javascript library for NODEJS
Version 0.10
*/
import EIP712Helper from "./EIP712Helper.js" 
import web3utils from 'web3-utils'

import ethUtil from 'ethereumjs-util'
 
 


//"BidPacket(address bidderAddress,address nftContractAddress,address currencyTokenAddress,uint256 currencyTokenAmount,uint256 expires)"
 

var sampleBidPacket = {
    bidderAddress: "0xb11ca87e32075817c82cc471994943a4290f4a14",
    nftContractAddress: "0x0000000000000000000000000000000000000000",
    currencyTokenAddress: "0x357FfaDBdBEe756aA686Ef6843DA359E2a85229c",
    currencyTokenAmount:1000,  
    requireProjectId: false,
    projectId:0,  
    expires:0,
    signature: 0x0
}


export default class BidPacketUtils {






    static getBidPacket(
        bidderAddress,nftContractAddress,currencyTokenAddress,currencyTokenAmount,requireProjectId,projectId,expires,signature)
    {

      return {
        bidderAddress:bidderAddress,
        nftContractAddress: nftContractAddress,
        currencyTokenAddress: currencyTokenAddress,
        currencyTokenAmount: currencyTokenAmount,
        expires:expires,
        requireProjectId: requireProjectId,
        projectId: projectId,
        signature:signature
      }


    }
 
  /// "\x19\x01",
  ///  getEIP712DomainHash('BuyTheFloor','1',_chain_id,address(this)),
   /// getBidPacketHash(bidderAddress,nftContractAddress,currencyTokenAddress,currencyTokenAmount,expires)
      static getBidTypedDataHash(typedData)
      {
        var typedDataHash = web3utils.soliditySha3(
                "\x19\x01",
                EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types),
                EIP712Helper.structHash(typedData.primaryType, typedData.message, typedData.types),
           
        );

        
        //console.log('meep 1 - correct',Buffer.from(EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types)).toString('hex')         )
        //console.log('meep 2 - correct', Buffer.from(EIP712Helper.structHash(typedData.primaryType, typedData.message, typedData.types)).toString('hex')   )
        return typedDataHash;
      }

/*
     static getLavaPacketSchemaHash()
     {
        var hardcodedSchemaHash = '0x8fd4f9177556bbc74d0710c8bdda543afd18cc84d92d64b5620d5f1881dceb37' ;
        return hardcodedSchemaHash;
     }*/


     static recoverBidPacketSigner(  typedData, signature){

      console.log('signature',signature)

       var sigHash = BidPacketUtils.getBidTypedDataHash( typedData, typedData.types);
       var msgBuf = ethUtil.toBuffer(signature)
       const res = ethUtil.fromRpcSig(msgBuf);


       var hashBuf = ethUtil.toBuffer(sigHash)

       const pubKey  = ethUtil.ecrecover(hashBuf, res.v, res.r, res.s);
       const addrBuf = ethUtil.pubToAddress(pubKey);
       const recoveredSignatureSigner    = ethUtil.bufferToHex(addrBuf);

       var message = typedData.message

       console.log('recovered signer pub address',recoveredSignatureSigner.toLowerCase())
       //make sure the signer is the depositor of the tokens
       return recoveredSignatureSigner.toLowerCase();

     }




     static signTypedData(privateKey, msgParams)
    {

      const msgHash = ethSigUtil.typedSignatureHash(msgParams.data)
       

      var msgBuffer= ethUtil.toBuffer(msgHash)

      const sig = ethUtil.ecsign(msgBuffer, privateKey)
      return ethUtil.bufferToHex(ethSigUtil.concatSig(sig.v, sig.r, sig.s))

    }

//"BidPacket(address bidderAddress,address nftContractAddress,address currencyTokenAddress,uint256 currencyTokenAmount,uint256 expires)"
 
    static getBidTypedDataFromParams( _chainId,_contractAddress,  bidderAddress, nftContractAddress, currencyTokenAddress, currencyTokenAmount, requireProjectId, projectId, expires)
    {
      const typedData = {
              types: {
                  EIP712Domain: [
                      { name: "contractName", type: "string" },
                      { name: "version", type: "string" },
                      { name: "chainId", type: "uint256" },
                      { name: "verifyingContract", type: "address" }
                  ],
                  BidPacket: [
                      { name: 'bidderAddress', type: 'address' },
                      { name: 'nftContractAddress', type: 'address' },
                      { name: 'currencyTokenAddress', type: 'address' },
                      { name: 'currencyTokenAmount', type: 'uint256' },    
                      { name: 'requireProjectId', type: 'bool' },  
                      { name: 'projectId', type: 'uint256' },      
                      { name: 'expires', type: 'uint256' }
                  ],
              },
              primaryType: 'BidPacket',
              domain: {
                  contractName: "BuyTheFloor",
                  version: "2",
                  chainId: _chainId,  
                  verifyingContract: web3utils.toChecksumAddress(_contractAddress)
              },
              message: {
                bidderAddress: web3utils.toChecksumAddress(bidderAddress),
                nftContractAddress: web3utils.toChecksumAddress(nftContractAddress),
                currencyTokenAddress: web3utils.toChecksumAddress(currencyTokenAddress),
                currencyTokenAmount: currencyTokenAmount,
                requireProjectId: requireProjectId,
                projectId: projectId,
                expires:expires,
              }
          };





        return typedData;
    }
 



      static formatAmountWithDecimals(amountRaw,decimals)
      {
      var amountFormatted = amountRaw / (Math.pow(10,decimals) * 1.0)
 
      return amountFormatted;
    }



  

        //updating to spec
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md

        //https://github.com/ethereum/EIPs/blob/master/assets/eip-712/Example.sol

      static getEIP712TypedData()
      {

        return {
          type: 'object',
          properties: {
            types: {
              type: 'object',
              properties: {
                EIP712Domain: {type: 'array'},
              },
              additionalProperties: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {type: 'string'},
                    type: {type: 'string'}
                  },
                  required: ['name', 'type']
                }
              },
              required: ['EIP712Domain']
            },
            primaryType: {type: 'string'},
            domain: {type: 'object'},
            message: {type: 'object'}
          },
          required: ['types', 'primaryType', 'domain', 'message']
        }



      }



      static async performOffchainSignForBidPacket(args, web3Plug){

         
 
        

       let chainId = web3Plug.getActiveNetId()

       let contractData = web3Plug.getContractDataForActiveNetwork()

       let contractAddress = contractData['buythefloor'].address
 
 
 
       const typedData = BidPacketUtils.getBidTypedDataFromParams(
             
            chainId,  //0x2a for Kovan  -- MUST be in hex!? 
            contractAddress,
            ...args  //unpack the args 
       )
        console.log('bidpacket  typedData',typedData)
 
        var stringifiedData = JSON.stringify(  typedData );

        
        let typedDatahash = BidPacketUtils.getBidTypedDataHash(typedData)

        console.log('typedDatahash',typedDatahash)
        let signResult = await  EIP712Helper.signTypedData( web3Plug.getWeb3Instance(), args[0], stringifiedData  )
        
        
        
        console.log( 'signResult', signResult )  

        return signResult



  }


/*
  let sellParams = {
          
    nftTokenAddress: this.selectedBidPacket.nftTokenAddress,
    tokenId: this.ownedTokenIdToSell, 
    from: this.web3Plug.getActiveAccountAddress(),
    to:  this.selectedBidPacket.bidderAddress,
    currencyToken: this.selectedBidPacket.currencyTokenAddress,
    currencyAmount: this.selectedBidPacket.currencyTokenAmount,
    expires: this.selectedBidPacket.expires,
    buyerSignature: this.selectedBidPacket.signature


   }*/

   
   static async getPacketBurnStatus(packet, BTFContractABI, web3Plug){

    let contractData = web3Plug.getContractDataForActiveNetwork()

    let contractAddress = contractData['buythefloor'].address
    let contract = web3Plug.getCustomContract( BTFContractABI,contractAddress )

    
    let typedData = BidPacketUtils.getBidTypedDataFromParams( 
      web3Plug.getActiveNetId(), 
      contractAddress,
      packet.bidderAddress, 
      packet.nftContractAddress, 
      packet.currencyTokenAddress, 
      packet.currencyTokenAmount, 
      packet.requireProjectId, 
      packet.projectId,
      packet.expires
       )



    let sigHash = BidPacketUtils.getBidTypedDataHash( typedData )


    let status =  await contract.methods.burnedSignatures(sigHash).call()
    console.log('burn status', packet, status )

    return parseInt(status)
   }

    
   static async sellNFTToBid(sellParams, BTFContractABI, web3Plug){

    let contractData = web3Plug.getContractDataForActiveNetwork()

    let contractAddress = contractData['buythefloor'].address
    let contract = web3Plug.getCustomContract( BTFContractABI,contractAddress )

    console.log(sellParams)

    return await contract.methods.sellNFT(...Object.values(sellParams)).send({ from: sellParams.from })

   }
}