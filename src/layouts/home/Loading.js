import React, { Component, Children } from 'react'

class Loading extends Component {
  constructor(props, context) {
    super(props)
  }

  render() {
      console.log(this.props);
    if (this.props.web3.status === 'failed')
    {
        <section className="__pofland__default_wrapper">
            <div className="container first_child">
                <h1 className="text-center">⚠️</h1>
                <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
            </div>
        </section>
    }

    if (this.props.drizzleStatus.initialized)
    {
      // Load the dapp.
      return Children.only(this.props.children)
    }

    return(
      // Display a loading indicator.
      <main>
        <h1>⚙️</h1>
        <p>Loading dapp...</p>
      </main>
    )
  }
}

export default Loading