import React from 'react'
import { NavLink } from 'react-router-dom'
import { AccountData } from 'drizzle-react-components'

class _Header extends React.Component {
    render() {
        return (
            <header className="header dark-bg">
                <span className="navbar-brand">
                    <img src="/assets/images/logo.png" className="img-circle" width="30"/>
                </span>

                <a className="logo">
                    Proof of Existence Dapp
                </a>

                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#navbar">
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                    </div>
                </div>
            </header>
        )
    }
}

export default _Header
