import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class IpfsStorageContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleIpfsResult = this.handleIpfsResult.bind(this)
    this.callContractMethod = this.callContractMethod.bind(this)

    this.contracts = context.drizzle.contracts;

    this.state = {
      message:'',
      file:'',     
      buffer:'',
      ipfsHash:'',
      transactionHash:'',
      txReceipt: '',
      block:'',
      blockTimestamp:''
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

    this.setState({ message: "Sending file to IPFS, this might take a while..." });
    console.log('hi there, I\'m sending the file to IPFS... be patient (:');
    ipfs.files.add(this.state.buffer, this.handleIpfsResult); 
  }
  
  handleIpfsResult(err,files){
    console.log(err,files);
    this.setState({ ipfsHash:files[0].hash });
    this.setState({ message: "File Uploaded sucessfully on IPFS: "+ files[0].hash });
    
    this.callContractMethod();
  }

  callContractMethod(){
    console.log('hey, I have the Ipfs Hash! Sending to the smart contract from: ' + this.props.account );

    this.contracts["IpfsStorage"].methods.sendHash(this.state.ipfsHash).send({from: this.account },
      (error, transactionHash) => {
        this.setState({ message: "Record saved on the smart contract. Tx hash: " + transactionHash});
        console.log("Sent! This is the transaction hash: " + transactionHash);
        this.setState({transactionHash});
        
        this.context.drizzle.web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log("Getting the Transaction Receipt: " + txReceipt);
          console.log(err,txReceipt);
          this.setState({txReceipt});
                  
          this.context.drizzle.web3.eth.getBlock(txReceipt.blockNumber, (err, block)=> {
            console.log("Getting the Block Number: " + block);
            console.log(err,block);    
            this.setState({block});      
            this.setState({blockTimestamp: this.state.block.timestamp});
          })
        });
      }); 
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="row mt">  
            <div className="col-lg-12">          
              <div className="form-group">
                <label className="control-label col-md-2">Select File</label>
                <div className="controls col-md-6">
                  <div className="fileupload fileupload-new" data-provides="fileupload">
                    <input type="file" className="btn btn-file" onChange={this.handleFileChange}/>
                  </div>
                </div>
              </div>
            </div>
          </div>              
          <div className="row mt">  
            <div className="col-lg-12">  
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">Tags</label>
                  <div className="col-md-6">
                    <input type="text" className="form-control round-form"/>
                  </div>
                  <div className="col-md-3"> 
                    <button type="submit" className="btn btn-theme">Send File</button>
                  </div>
                </div> 
            </div>
          </div>
          <div className="row mt">  
            <div className="col-md-12">  
              <p><strong>{this.state.message}</strong></p>  
            </div>
          </div>  
        </form>         
      </div>
    )
  }
}

IpfsStorageContractForm.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(IpfsStorageContractForm, mapStateToProps)