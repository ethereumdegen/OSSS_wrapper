
 
import axios from "axios";


export default class TheGraphHelper {


  static async resolveGraphQuery(graphURL, queryString){

    return new Promise(   (resolve, reject) => {

      axios.post(graphURL,{query: queryString})
      .then((res) => {
         
           console.log(res.data)
           let results = res.data
           //let owner = results.data.owners[0]
           //if(!owner)return 

     
            resolve(results)

       }) .catch((error) => {
           console.error(error)
           reject(error)
       })

   }); 

  }


    static async findCryptovoxelsOwnedBy(publicAddress){

      publicAddress = publicAddress.toLowerCase()

      let graphURL = "https://api.thegraph.com/subgraphs/name/zoltarseven/cryptovoxels"

      let queryString = `
      {
        accounts(where:{address:"`+publicAddress+`"}) {
          id,
          parcel {
            id,
            tokenID
          }
         
        }
       
      }`

      let result = await TheGraphHelper.resolveGraphQuery(graphURL , queryString  )

      console.log('graph', result)

      let parcelTokens =  result.data.accounts[0].parcel

      return parcelTokens.map(x => ({tokenId: x.tokenID, needsWrap: false}))

      //return token ids in an array of objects 
    }


   

    static async findMooncatsOwnedBy(publicAddress)
  {
       publicAddress = publicAddress.toLowerCase()
 
        let graphURL = "https://api.thegraph.com/subgraphs/name/rentft/moon-cat-rescue"

        let queryString = `
                        {
                  
                          owners(where:{id:"`+publicAddress+`"}) {
                            id,
                            cats {
                              id
                            }
                            
                          }
                        }
                    `        
                           

                        
      let result = await TheGraphHelper.resolveGraphQuery(graphURL , queryString  )

      console.log('graph', result)
      let catTokens =  result.data.owners[0].cats

      return catTokens.map(x => ({tokenId: x.id, needsWrap: !x.isWrapped}))
 

    }


    static async findWrappedPunksOwnedBy(publicAddress)
    {
   
   
          let graphURL = "https://api.thegraph.com/subgraphs/name/itsjerryokolo/cryptopunks"
  
          let queryString = `
                              {
                              owners(where:{id:"`+publicAddress+`"}) {
                                  id
                                  allpunksOwned {
                                  id
                                  }
                              
                              }
                              }  
                              `


          let result = await TheGraphHelper.resolveGraphQuery(graphURL , queryString  )
  
          console.log('graph', result)
          let tokens =  result.data.owners[0].allpunksOwned
    
          return tokens.map(x => ({tokenId: x.id, needsWrap: true}))
   
  
      }



      static async findHashmasksOwnedBy(publicAddress)
      {
           publicAddress = publicAddress.toLowerCase()
     
            let graphURL = "https://api.thegraph.com/subgraphs/name/tibike6/hashmasks"
    
            let queryString = `
                        {
                          account(id: "`+publicAddress+`") {
                            id
                            hashmasks {
                              id
                              name
                            }
                          }
                        }
                        `        
                               
    
                            
          let result = await TheGraphHelper.resolveGraphQuery(graphURL , queryString  )
    
          console.log('graph', result)
          let tokens =  result.data.account.hashmasks
    
          return tokens.map(x => ({tokenId: x.id, needsWrap: false, specialName: x.name}))
     
    
        }
    

        

        static async findBoughtTheFloorHistory( )
        {
       
       
              let graphURL = "https://api.thegraph.com/subgraphs/name/admazzola/buy-the-floor"
      
              let queryString = `
                                {
                                  boughtTheFloors(last: 15) {
                                    id
                                    bidderAddress
                                    sellerAddress
                                    nftContractAddress
                                    currencyTokenAddress
                                    currencyTokenAmount
                                    blockNumber
                                  }
                                
                                }
              
                                  `
    
    
              let result = await TheGraphHelper.resolveGraphQuery(graphURL , queryString  )
      
              console.log('graph', result)
              
              return result.data.boughtTheFloors
      
          }
     
      





  /*
            axios.post('https://api.thegraph.com/subgraphs/name/tibike6/mooncatrescue', {
                  query: `
                  {
                    owners(where:{id:"`+userAddress+`"}) {
                      id
                      cats {
                        id
                      }
                    
                    }
                  }  
                  `
                })
                .then((res) => {
                  
                    console.log(res.data)
                    let results = res.data
                    let owner = results.data.owners[0]
                    if(!owner)return 
 
                  
                    resolve(owner.cats)
                })
                .catch((error) => {
                  console.error(error)
                  reject(error)
                })

  */

 
 




}