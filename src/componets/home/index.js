import React, { Component } from 'react';

import Calendar from 'react-calendar';
// import Moment from 'react-moment';

import {Redirect} from 'react-router-dom'

class Calender extends Component {
    constructor() {
        super()
        this.state = {
            diaryDate: new Date(),
            dateSelected:false,
        }
        this.onChange = this.onChange.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    onChange(date) {
        this.setState({diaryDate:date})
        this.renderRedirect()
    }

    renderRedirect(){
        this.setState({
            dateSelected: !this.state.dateSelected,
        })
    }
    
    redirect(){
        console.log(this.state.diaryDate)
        sessionStorage.setItem('date',this.state.diaryDate)
        if(this.state.dateSelected){
            return <Redirect to='/controller'/>
        }
    }

    render() {
        return (
            <div>
                
                <Calendar
                    value={this.state.diaryDate}
                    onChange={this.onChange}
                />
                {this.redirect()}
                {/* <Moment>{dateToFormat}</Moment> */}
            </div>
        );
    }
}

export default Calender;