
 
import axios from "axios";


export default class StarflaskAPIHelper {


  static async resolveStarflaskQuery(uri, inputData){

    return new Promise(   (resolve, reject) => {

      axios.post(uri, inputData )
      .then((res) => {
         
           console.log(res.data)
           let results = res.data
          
     
            resolve(results)

       }) .catch((error) => {
           console.error(error)
           reject(error)
       })

   }); 

  }


    /*

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
     
    
        }*/
     




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