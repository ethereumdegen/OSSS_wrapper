import axios from 'axios'

import fs from 'fs'
import path from 'path'
 

async function runTask(){




let totalSupply = 99 

let collectionName = 'xcopycats-1'
 
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



let data = {
    contractData: contractData,
    tokenIds: tokenIds

}

console.log("found token ids ", tokenIds.length )


fs.writeFileSync( path.join ( "./output/outputconfig.json" ) , JSON.stringify( data ) );




}


runTask() 


