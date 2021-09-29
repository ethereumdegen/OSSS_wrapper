#### NFT Wrapping Toolkit 

edit tasks/fetchConfig.json  to your liking 


run  yarn fetchCollectionData 


This script helps collect all tokenIDs for an opensea collection.  It stuffs that giant array into a Merkel tree and outputs the Merkel root which serves as a 'whitelist'.  You will need to deploy the generic wrapper contract and specify the OpenSeaSharedStorefront contract address as well as this MerkleRoot.  This will allow any tokens in that contract with those tokenIds to be wrapped as new NFTs in that new contract of their own! 

#### run tests 

Yarn 

Yarn compile 

Yarn test 



