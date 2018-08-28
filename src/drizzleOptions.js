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
    IpfsStorage
  ],
  events: {
    IpfsStorage: ['LogNewFile'],
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions