import React, { Component } from 'react'

const Context = React.createContext()
export class Provider extends Component {
    state={
        userDetails:{},
        
    }
    componentDidMount(){
        console.log('at context now')
        // fetch(``)
        //     .then(res =>{
        //         console.log(res.data)
        //         // this.setState({userDetails: res.data})
        //     })
        //     .catch(err => console.log(err))
    }
    
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer