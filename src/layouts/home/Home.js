import React, { Component } from 'react'
import IpfsStorageContractForm from './IpfsStorageContractForm'

class Home extends Component {

  constructor(props, context) {
    super(props)
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
                  
        <div className="pure-u-1-1">
            <h2>Start by Adding a file...</h2>
            <p>By adding a file, you'll be saving it on the Interplanetary File System (IPFS) and registering its hash on Ethereum.</p>
            <p className="__pofland__emphasis">*Please, don't store any sensitive data as your files are not encrypted and can be viewed by anyone with the hash. (;</p>

            <IpfsStorageContractForm account={this.props.accounts[0]} />

            <br/><br/>
          </div> 
        </div>
      </main>
    )
  }
}

export default Home
