import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class File extends Component {

  constructor(props, context) {
    super(props)
    
    this.contracts = context.drizzle.contracts;

    this.state = {
      timestamp:''
    }
  }

  componentWillMount(){
    this.contracts["IpfsStorage"].methods.getFile(this.props.match.params.id).call({from: this.account },
      (error, file) => {                   
          console.log(file);
          this.setState({timestamp:file[3]});                    
    });
  }

  render() {
    return (
      <main className="container">
        <span className="__pofland__img_data">Timestamp: {this.state.timestamp}</span>
      
        <div className="pure-g">
          <div className="pure-u-1-1">
            <img src={`https://gateway.ipfs.io/ipfs/${ this.props.match.params.hash }`}/>
          </div> 
        </div>
      </main>
    )
  }
}

File.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(File, mapStateToProps)