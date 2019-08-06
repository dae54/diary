import React, { Component } from 'react'
// import Diary from '../diaryBody/index'
import { Redirect } from 'react-router-dom'


class Controller extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            re_password: '',
            hasAccount: true,
            isAuthenticated: false,
            isPreviouslyLoggedIn: false,
            uuid: ''
        }

        this.createAccount = this.createAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkAccount = this.checkAccount.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.redirect = this.redirect.bind(this);
    }
    //check for sessions
    //if no sessions, redirect to login
    //login

    //else
    //

    createAccount(e) {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log(data)
        e.preventDefault();
        console.log("entered")
        fetch('http://localhost:8000/createAccount', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.accepted)
                if (data.accepted) {
                    this.setState({ hasAccount: true })
                }
            })
    }
    handleLogin(e) {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log("entered")
        fetch('http://localhost:8000/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.accepted) {
                    sessionStorage.setItem('uuid', data.uuid)
                    this.setState({ uuid: data.uuid })
                    this.setState({ isAuthenticated: true })
                }
            })
    }
    //if isAuthenticated redirect to diary
    redirect() {
        return <Redirect to={`/user/${this.state.uuid}`} />
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    //checks if user has account
    checkAccount() {
        this.setState({
            hasAccount: !this.state.hasAccount
        })
    }
    size = {
        width: '18rem'
    }
    componentDidMount() {
        if (sessionStorage.getItem('uuid') != null) {
            const data = {
                uuid: sessionStorage.getItem('uuid'),
            }
             fetch('http://localhost:8000/userDetails', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body:JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.accepted) {
                    this.setState({ email: data.email })
                }
            })
        }
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                // <Redirect to={`/user`}></Redirect>
                // <Diary />
                <div>{this.redirect()}</div>
            )
        } else {
            if (this.state.hasAccount) {
                return (
                    <div>
                        <form onSubmit={this.handleLogin}>
                            <div className="card" style={this.size}>
                                <div className="card-header">
                                    Login
                                    </div>
                                <div className="card-body">
                                    <h5 className="card-title">Email</h5>
                                    <p className="card-text">
                                        <input type='email' value={this.state.email} name='email' onChange={this.handleChange} />
                                    </p>
                                    <h5 className="card-title">Password</h5>
                                    <p className="card-text">
                                        <input type='password' value={this.state.password} name='password' onChange={this.handleChange} />
                                    </p>

                                    <button className="btn btn-primary">submit</button>
                                    <p>dont have account? </p><span onClick={this.checkAccount}>click here</span>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <form onSubmit={this.createAccount}>
                            <div className="card" style={this.size}>
                                <div className="card-header">
                                    Create Account
                                    </div>
                                <div className="card-body">
                                    <h5 className="card-title">UserName</h5>
                                    <p className="card-text">
                                        <input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
                                    </p>
                                    <h5 className="card-title">User Email</h5>
                                    <p className="card-text">
                                        <input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
                                    </p>
                                    <h5 className="card-title">Password</h5>
                                    <p className="card-text">
                                        <input type='password' value={this.state.password} name='password' onChange={this.handleChange} />
                                    </p>
                                    <h5 className="card-title">Re-Password</h5>
                                    <p className="card-text">
                                        <input type='password' value={this.state.re_password} name='re_password' onChange={this.handleChange} />
                                    </p>

                                    <button className="btn btn-primary">submit</button>
                                    <p>have account? </p><span onClick={this.checkAccount}>click here</span>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        }
    }
}

export default Controller