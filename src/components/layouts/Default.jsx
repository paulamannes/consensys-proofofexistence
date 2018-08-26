import React from 'react'
import Layout from './_Layout'
import Header from './_Header'
import Footer from './_Footer'

class Default extends React.Component {
    render() {
        return (
            <Layout>
                <Header/>
                { this.props.children }
                <Footer/>
            </Layout>
        )
    }
}

export default Default
