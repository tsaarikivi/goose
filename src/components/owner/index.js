import React from 'react'

export default class Owner extends React.Component {
    render() {
        return (
            <div>
                Owner
                {this.props.children}
            </div>
        )
    }
}
