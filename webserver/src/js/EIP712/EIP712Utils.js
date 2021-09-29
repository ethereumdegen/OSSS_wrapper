/* 
javascript library for NODEJS
Version 0.10
*/
import EIP712Helper from "./EIP712Helper.js" 
import web3utils from 'web3-utils'

import ethUtil from 'ethereumjs-util'
  

//"BidPacket(address bidderAddress,address nftContractAddress,address currencyTokenAddress,uint256 currencyTokenAmount,uint256 expires)"
  


export default class EIP712Utils {
 
/*
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


    }*/
 
  /// "\x19\x01",
  ///  getEIP712DomainHash('BuyTheFloor','1',_chain_id,address(this)),
   /// getBidPacketHash(bidderAddress,nftContractAddress,currencyTokenAddress,currencyTokenAmount,expires)
      static getTypedDataHash(typedData)
      {
        var typedDataHash = web3utils.soliditySha3(
                "\x19\x01",
                EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types),
                EIP712Helper.structHash(typedData.primaryType, typedData.message, typedData.types),
           
        );

        
        //console.log(' ',Buffer.from(EIP712Helper.structHash('EIP712Domain', typedData.domain, typedData.types)).toString('hex')         )
        //console.log(' ', Buffer.from(EIP712Helper.structHash(typedData.primaryType, typedData.message, typedData.types)).toString('hex')   )
        return typedDataHash;
      }
 


     static recoverPacketSigner(  typedData, signature){

      console.log('signature',signature)

       var sigHash = EIP712Utils.getBidTypedDataHash( typedData, typedData.types);
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
    
    /*
      dataValues must be formatted as such:

                bidderAddress: web3utils.toChecksumAddress(bidderAddress),
                nftContractAddress: web3utils.toChecksumAddress(nftContractAddress),
                currencyTokenAddress: web3utils.toChecksumAddress(currencyTokenAddress),
                currencyTokenAmount: currencyTokenAmount,
                requireProjectId: requireProjectId,
                projectId: projectId,
                expires:expires,
    */


    static getTypedDataFromParams( _chainId,_contractAddress, customConfig, dataValues)
    {



      var typedData = {
              types: {
                  EIP712Domain: [
                      { name: "contractName", type: "string" },
                      { name: "version", type: "string" },
                      { name: "chainId", type: "uint256" },
                      { name: "verifyingContract", type: "address" }
                  ]
              },
              primaryType: customConfig.primaryType,
              domain: {
                  contractName: customConfig.contractName,
                  version: customConfig.version,
                  chainId: _chainId,  
                  verifyingContract: web3utils.toChecksumAddress(_contractAddress)
              },
              message: dataValues  
          };

          typedData.types[customConfig.primaryType] = []

          for(let [key,value] of Object.entries(customConfig.entries)){
            typedData.types[customConfig.primaryType].push( {name:key, type: value} )
          } 


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



      static async performOffchainSignForBidPacket(chainId, contractAddress,customConfig, dataValues, signerAddress, web3){

          
 
       const typedData = EIP712Utils.getTypedDataFromParams(
             
            chainId,  
            contractAddress,
            customConfig,
            dataValues  
       )
        
 
        var stringifiedData = JSON.stringify(  typedData );

        
        let typedDatahash = EIP712Utils.getTypedDataHash(typedData)

        console.log('typedDatahash',typedDatahash)
        let signResult = await  EIP712Helper.signTypedData( web3, signerAddress, stringifiedData  )
        
        
        
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

     
}