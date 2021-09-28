import axios from 'axios'

import fs from 'fs'
import path from 'path'
 

const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256');

const Web3 = require('web3')
let web3 = new Web3() 

const fetchConfig = require('./fetchConfig.json')

async function runTask(){

 

 // artblox 

// 0x388f486dbcbe05029ba7adf784459b580b427032
// 0x1ae795286c5dd0cad1dd38aef9a3015558e9d303ec7474e5e59abc16a43abbd6


let tokenIds= ["5","6","7","8"]

let tokenIdToWrap = "7"


const leaves = tokenIds.map((x:any) => Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', x ) ))
const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})

const hexRoot = tree.getHexRoot()

const leaf = Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', tokenIdToWrap )   )
      
 const hexproof = tree.getHexProof(leaf)


 
console.log(" token ids ", tokenIds.length )
console.log("hexRoot is ", hexRoot )

console.log(" token id to gen proof ", tokenIdToWrap )
console.log("hexproof is ", hexproof )

console.log(tree.verify(hexproof, leaf, hexRoot)) // true


}


runTask() 


