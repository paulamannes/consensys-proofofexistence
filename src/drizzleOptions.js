import SimpleStorage from './../build/contracts/SimpleStorage.json'
import IpfsStorage from './../build/contracts/IpfsStorage.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    SimpleStorage,
    IpfsStorage
  ],
  events: {
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions