import { Contract, Signer } from 'ethers'
import * as hre from 'hardhat'

const { getNamedSigner, contracts, deployments, ethers } = hre

interface TestSetupResult {
  mintableToken: Contract,
  wrappedToken: Contract,
   
  user: Signer
  deployer: Signer
}

interface CreateBundleArgs {
  721?: number[]
  1155?: [number, number][]
}
export interface TokenBundle {
  types: number[]
  addresses: string[]
  ids: Array<string | number>
  amounts: Array<string | number>
}
export type CreateBundleFn = (args: CreateBundleArgs) => Promise<TokenBundle>

export const setup = deployments.createFixture<TestSetupResult, never>(async () => {
  await hre.deployments.fixture('airdrop', {
    keepExistingDeployments: false
  })

  const deployer = await getNamedSigner('deployer') 
  const user = await getNamedSigner('user') 

  const mintableToken = await contracts.get('MintableERC721') 
  const wrappedToken = await contracts.get('WrappedNonFungibleToken') 

    

  return {
    mintableToken,
    wrappedToken,
    deployer,
    user
  }
})
