import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IpfsRetrieveContractForm extends Component {
  constructor(props, context) {
    super(props);

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

  callContractMethod(){
    console.log('hey, now I wanna retrieve the into on the blockchain!');

    this.contracts["IpfsStorage"].methods.getFileIndexes().send({from: this.account },
      (error, indexArray) => {
      }); 
  }

  render() {
    return (
      <div>
        <div className="row mt">  
          <div className="col-lg-12">  
          hellow
          </div>
        </div>
      </div>
    )
  }
}

IpfsRetrieveContractForm.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(IpfsRetrieveContractForm, mapStateToProps)