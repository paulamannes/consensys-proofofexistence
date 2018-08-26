import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class Home extends Component {

  constructor(props, context) {
    super(props)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.state = {
      file:null,     
      buffer:'',
      ipfsHash:null
    }
  }

  handleFileChange(e) {
    this.setState({file:e.target.files[0]})

    event.stopPropagation()
    event.preventDefault()
    const file = e.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.getBuffer(reader)
  }

  getBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);    
    this.setState({buffer})
  }

  handleFormSubmit(e) {
    e.preventDefault();

    console.log('Sending from Metamask account: ' + this.props.accounts[0] );
    (async () => {
      await this.saveToIpfs();
    })();
  }

  saveToIpfs = async() => {
    debugger;
    console.log("ipfs");
    var result = await ipfs.files.add(this.state.buffer, function (err, files) {
      // 'files' will be an array of objects containing paths and the multihashes of the files added
      console.log(err,files);
    });    
    //console.log("result= "+ result);
    //this.setState({ ipfsHash:result[0].hash });
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
                  
        <div className="pure-u-1-1">
            <h2>Start by Adding a file...</h2>
            <p>By adding a file, you'll be saving it on the Interplanetary File System (IPFS) and registering its hash on Ethereum.</p>
            <p className="__pofland__emphasis">*Please, don't store any sensitive data as your files are not encrypted and can be viewed by anyone with the hash. (;</p>
            <p><strong>Stored file</strong>: <ContractData contract="IpfsStorage" method="getHash" /></p> 
            <ContractForm contract="IpfsStorage" method="sendHash" />
            <form onSubmit={this.handleFormSubmit}>
              <input type="file" onChange={this.handleFileChange}/>
              <button type="submit">Send File</button>
            </form>
            <br/><br/>
          </div>  

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>SimpleStorage</h2>
            <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
            <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
            <ContractForm contract="SimpleStorage" method="set" />
            <br/><br/>
          </div>        
        </div>
      </main>
    )
  }
}

export default Home
