import React from 'react'
import { AccountData } from 'drizzle-react-components'

class _Header extends React.Component {
    render() {
        return (
            <header className="header dark-bg">
                <span className="navbar-brand">
                    <img src="/assets/images/logo.png" className="img-circle" width="30" alt="logo"/>
                </span>

                <a className="logo">
                    Proof of Existence Dapp
                </a>

                <div className="__pofland__account">
                    <AccountData accountIndex="0" units="ether" precision="3" />
                </div>
            </header>
        )
    }
}

export default _Header
