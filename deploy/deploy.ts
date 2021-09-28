import { DeployFunction } from 'hardhat-deploy/types'

import { deploy } from '../utils/deploy-helpers'
import { BigNumberish, BigNumber as BN } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'


const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const keccak256 = require('keccak256');

const deployOptions: DeployFunction = async (hre) => {
  const { getNamedSigner, run, log } = hre
  const deployer = await getNamedSigner('deployer')

  // Make sure contracts are compiled
  await run('compile')

  log('')
  log('********** Teller Options **********', { indent: 1 })
  log('')

  const MintableToken = await deploy({
    contract: 'MintableERC721',
    name: 'MintableERC721',
    args: [],
    hre
    
  }) 

  let tokenIdsArray = ['2','4','7']

  const leaves = tokenIdsArray.map((x:any) => keccak256(x))
  const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
   
  const hexRoot = tree.getHexRoot()

  console.log('deploy hex root is ', hexRoot)

 

  const WrappedToken = await deploy({
    contract: 'WrappedNonFungibleToken',
    name: 'WrappedNonFungibleToken',
    args: ['WrappableToken','WRP',MintableToken.address,hexRoot],
    hre
    
  }) 
 
}
 

deployOptions.tags = ['airdrop']
deployOptions.dependencies = []

export default deployOptions
