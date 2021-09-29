

const EventEmitter = require('events');
class AccessPlugEmitter extends EventEmitter {}

const accessPlugEmitter = new AccessPlugEmitter();


import FrontendHelper from './frontend-helper.js'

export default class AccessPlug {


    async reconnect(){

        try{
            let existingAccessTokenDataJSON = localStorage.getItem('accessToken');

            let existingAccessTokenData  = JSON.parse(existingAccessTokenDataJSON)
    
            let ONE_DAY = 1000*60*60*24;
            if(existingAccessTokenData && existingAccessTokenData.created_at > (Date.now() - ONE_DAY)){
    
                this.accessToken = existingAccessTokenData.token 
                console.log('found existing token', this.accessToken ) 
                
                this.isConnected = true   
                 
                accessPlugEmitter.emit('stateChanged', this.getConnectionState() )
     
                return true 
            }  
        }catch(e){
            console.error(e)
        }

       

        return false 
    }

    async connect(web3Plug){
        console.log('connecting ')

        await this.reconnect()

        if( this.isSignedIn()  ){
            return 
        }


      

        let publicAddress = web3Plug.getActiveAccountAddress()

        let result = await FrontendHelper.requestAccessChallenge( publicAddress )
        

        let signature = await web3Plug.requestPersonalSignature( result.accessChallenge  )

        console.log( 'signature', signature )

        let response = await FrontendHelper.requestAccessToken( publicAddress, signature )

        if(response.success){
            let newTokenData = { created_at:Date.now(), token: response.accessToken , publicAddress: publicAddress  }
            console.log('set access token' , newTokenData)
            localStorage.setItem('accessToken', JSON.stringify(newTokenData ) );
        }

        await this.reconnect()

        console.log( 'response', response )
    }


    isSignedIn(){
        return this.isConnected 
    }

    signOut(){
        this.accessToken = null  
        this.isConnected = false   
                 
        accessPlugEmitter.emit('stateChanged', this.getConnectionState() )
    }


    getConnectionState(){
        return {isConnected: this.isConnected, accessToken: this.accessToken}
    }


 

    getPlugEventEmitter(){
        return accessPlugEmitter
      }

}