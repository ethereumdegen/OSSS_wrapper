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




let totalSupply = fetchConfig.totalSupply

let collectionName = fetchConfig.collectionName
 
let contractData


let tokenIds = [] 


for(let offset=0; offset<totalSupply; offset+=50){


    let URI = `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=50&collection=${collectionName}`
 
    const res = await axios.get( URI )

    console.log(res)

    for(let asset of res.data.assets){

        tokenIds.push(asset.token_id)
    }

    if(!contractData){
        contractData = res.data.assets[0].asset_contract

        console.log(contractData)
    }
       

}

 // artblox 

// 0x388f486dbcbe05029ba7adf784459b580b427032
// 0x1ae795286c5dd0cad1dd38aef9a3015558e9d303ec7474e5e59abc16a43abbd6

const leaves = tokenIds.map((x:any) => Web3.utils.keccak256( web3.eth.abi.encodeParameter('uint256', x ) ))
const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})

const hexRoot = tree.getHexRoot()



let data = {
    contractData: contractData,
    tokenIds: tokenIds,
    hexRoot: hexRoot

}

console.log("found token ids ", tokenIds.length )
console.log("hexRoot is ", hexRoot )


fs.writeFileSync( path.join ( "./output/outputconfig.json" ) , JSON.stringify( data ) );




}


runTask() 


