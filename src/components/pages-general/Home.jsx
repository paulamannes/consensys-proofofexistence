import React from 'react'
import HomeContainer from './../../layouts/home/HomeContainer'

class Home extends React.Component {
    render() {
        return (
            <section className="__pofland__default_wrapper">
                <div className="__pofland__parallax">
                    <div className="container first_child">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1 className="__pofland__home_title text-center">
                                    Save files on IPFS and prove they really exist with Ethereum
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container text-center">
                </div>
                
                <HomeContainer /> 

                <div className="__pofland__parallax"/>
            </section>
        )
    }
}

export default Home
