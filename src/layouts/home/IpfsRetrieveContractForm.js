import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IpfsRetrieveContractForm extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    this.state = {
        files: []
    }
  }

  componentWillMount(){
    this.contracts["IpfsStorage"].methods.getFileIndexes().call({from: this.account },
      (error, indexArray) => {
          indexArray.map((item) => {
            return(
              this.contracts["IpfsStorage"].methods.getFile(item).call({from: this.account },
               (error, file) => {                   
                    console.log(file);
                    var files = this.state.files.concat({
                        index: item,
                        fileName:file[0],
                        ipfsHash:file[1],
                        tags:file[2],
                        timestamp:file[3]
                    });
                    
                    this.setState({ files: files });
              })
            )
          })
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="content-panel">
              <h4><i className="fa fa-angle-right"></i> All files from user</h4>
              <hr/>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>File name</th>
                    <th>Tags</th>
                    <th>IPFS Link</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.files.map((item) => {
                     return(
                      <tr key={item.index}>
                        <td>{item.index}</td>
                        <td>{item.fileName}</td>
                        <td>{item.tags}</td>
                        <td><a href={`https://gateway.ipfs.io/ipfs/${item.ipfsHash}`} target="_blanck">{ item.ipfsHash }</a></td>
                        <td>{item.timestamp}</td>
                      </tr>
                      )
                  })}
                </tbody>
              </table>
            </div>
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