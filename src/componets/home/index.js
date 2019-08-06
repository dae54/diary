import React, { Component } from 'react';

import Calendar from 'react-calendar';
import moment from 'moment'
// import env from '../../env'
import { Redirect } from 'react-router-dom'

import ReferMemo from './ReferMemo'
import AllMemo from './allMemo'

class Calender extends Component {
    constructor() {
        super()
        this.state = {
            diaryDate: new Date(),
            dateSelected: false,
        }
        this.onChange = this.onChange.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    onChange(date) {
        // let port=3001
        // console.log(env+port)
        this.setState({ diaryDate: date })
        this.renderRedirect()
    }

    renderRedirect() {
        this.setState({ dateSelected: !this.state.dateSelected }, () => {
            sessionStorage.setItem('date', moment(this.state.diaryDate).format('YYYY-MM-DD'))
        })

    }

    redirect() {
        console.log(this.state.diaryDate)
        if (this.state.dateSelected) {
            return <Redirect to='/controller' />
        }
    }
    start = {
        textAlign: 'center'
    }
    font = {
        'fontFamily': 'Comic Sans Ms'
    }
    AllMemoBox={
        'maxHeight':600,
    }
    render() {
        return (
            <>
                <div className='container' >
                    <h3 style={this.start}>DEMO DIARY</h3>
                    <div className='row'>
                        <div className="col-sm">
                            <Calendar
                                value={this.state.diaryDate}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="col-sm border overflow-auto" style={this.AllMemoBox}>
                            <AllMemo />
                        </div>
                    </div>
                    <div>
                        <h4 style={this.font}>In This Month</h4>
                        <ReferMemo />
                        <ReferMemo />
                        <ReferMemo />
                        <ReferMemo />
                    </div>

                    {this.state.dateSelected &&
                        <Redirect to='/controller' />
                    }
                </div>
            </>
        );
    }
}

export default Calender;