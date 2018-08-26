import React from 'react'

class _Layout extends React.Component {
    render() {
        return (
            <div id="pofland__main_layout">
                { this.props.children }
            </div>
        )
    }
}

export default _Layout
