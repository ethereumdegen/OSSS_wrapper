import { Contract, Signer } from 'ethers'
import * as hre from 'hardhat'
import { CreateBundleFn, setup } from './helpers/setup'

const { use, should, expect } = require('chai')
const { solidity } = require('ethereum-waffle')

const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256');

const Web3 = require('web3')

let web3 = new Web3() 

use(solidity)
should()
 

describe('MerkleAirdrop', function () {
  let mintableTokenContract: Contract
  let wrappedTokenContract: Contract
    
  let user: Signer
  let deployer: Signer

  beforeEach(async () => {
    const results = await setup()
    mintableTokenContract = results.mintableToken
    wrappedTokenContract = results.wrappedToken
    user = results.user
    deployer = results.deployer 
    
    let params ={to: await user.getAddress(), value: Web3.utils.numberToHex( Web3.utils.toWei('1') ) }
    await deployer.sendTransaction(params)

    
  })

  //const addressList = require('../config/airdropList.json')

  const wrappingConfig = require('./wrappingconfig.json')

 
  describe('merkle tree ', () => {
    it('should be able to verify offchain', async () => {
     
      let tokenIdToMintAndWrap = '7'
 
      const leaves = wrappingConfig.tokenIds.map((x:any) => Web3.utils.keccak256(  x    ))
      const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
      const root = tree.getRoot().toString('hex')
      const leaf = web3.utils.keccak256(  tokenIdToMintAndWrap   )

      const proof = tree.getProof(leaf)
      console.log(tree.verify(proof, leaf, root)) // true

    
      expect(tree.verify(proof, leaf, root)).to.equal(true)


      const badLeaves = ['a', 'x', 'c'].map((x:any) => keccak256(x))
      const badTree = new MerkleTree(badLeaves, keccak256, {sortPairs: true})
      const badLeaf = keccak256('x')
      const badProof = tree.getProof(badLeaf)
      console.log(tree.verify(badProof, leaf, root)) // false

      expect(tree.verify(badProof, leaf, root)).to.equal(false)

    })
  })

  /*

   

  */

  describe('token contract ', () => {
    it('should be able to mint', async () => {
      

        let tokenIdToMintAndWrap = '7'
        
       
      const leaves = wrappingConfig.tokenIds.map((x:any) => Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', x ) ))
      const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
      
      const hexRoot = tree.getHexRoot()
      
      console.log('hex root is ', hexRoot)

      const userAddress = await user.getAddress()
     // console.log('user address',userAddress)

     console.log('web3',web3)

      const leaf = Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', tokenIdToMintAndWrap )   )
      
      const hexproof = tree.getHexProof(leaf)

      console.log(tree.verify(hexproof, leaf, hexRoot)) // true
      expect(tree.verify(hexproof, leaf, hexRoot)).to.equal(true)

       

      await mintableTokenContract.connect(user).mint( tokenIdToMintAndWrap );
      await mintableTokenContract.connect(user).setApprovalForAll(wrappedTokenContract.address,true );

      let mintedTokenBalance = await mintableTokenContract.connect(user).balanceOf( userAddress  )
      mintedTokenBalance.should.equal(1)

      let isApproved = await mintableTokenContract.connect(user).isApprovedForAll( userAddress, wrappedTokenContract.address  )
      isApproved.should.equal(true)



      await wrappedTokenContract.connect(user).wrapWithProof( tokenIdToMintAndWrap , hexproof  ); 

      let wrappedTokenBalance = await wrappedTokenContract.connect(user).balanceOf(  userAddress  )
      wrappedTokenBalance.should.equal(1)

      mintedTokenBalance = await mintableTokenContract.connect(user).balanceOf( userAddress  )
      mintedTokenBalance.should.equal(0)

      let newlyMintedTokenId = await wrappedTokenContract.connect(user).legacyTokenIdRegister(tokenIdToMintAndWrap)
      console.log('newlyMintedTokenId',newlyMintedTokenId)

      newlyMintedTokenId.should.equal(1)

      await wrappedTokenContract.connect(user).unwrap( newlyMintedTokenId  ); 
      wrappedTokenBalance = await wrappedTokenContract.connect(user).balanceOf(  userAddress  )
      wrappedTokenBalance.should.equal(0)

      mintedTokenBalance = await mintableTokenContract.connect(user).balanceOf( userAddress  )
      mintedTokenBalance.should.equal(1)



      //wrap again 
      await wrappedTokenContract.connect(user).wrapWithProof( tokenIdToMintAndWrap , hexproof  ); 

        newlyMintedTokenId = await wrappedTokenContract.connect(user).legacyTokenIdRegister(tokenIdToMintAndWrap)
      console.log('newlyMintedTokenId',newlyMintedTokenId)
      newlyMintedTokenId.should.equal(1)

      //unwrap again 
      await wrappedTokenContract.connect(user).unwrap( newlyMintedTokenId  ); 


    })
  })
  
})
