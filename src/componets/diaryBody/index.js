import React, { Component } from 'react'
import Memos from './Memos'
// import { Consumer } from '../../context'

class Diary extends Component {
    constructor() {
        super()
        this.state = {
            memo: '',
            memos: {},
            dataReturned: false,
        }

        this.addMemo = this.addMemo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteMemo = this.deleteMemo.bind(this)
    }
    fetchDatas() {
        const memo_details = {
            uuid: this.props.match.params.uuid,
            due_date: sessionStorage.getItem('date')
        }

        fetch('http://localhost:8000/fetchMemo', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(memo_details)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ memos: data, dataReturned: true })
            })
        return null
    }

    addMemo(e) {
        const toDbs = {
            memoBody: this.state.memo,
            uuid: sessionStorage.getItem('uuid'),
            due_date: sessionStorage.getItem('date')            
        }
        e.preventDefault();
        fetch('http://localhost:8000/memo_upload', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(toDbs)
        })
            .then(res => res.json())
            .then(data => {
                if (data.accepted) {
                    this.fetchDatas()
                }
            })

        //clearing the textfield after adding the content to the db
        this.setState({
            memo: ''
        })

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    

    //to be fired by the memos.js delete memo component
    deleteMemo(id) {
        console.log(id)
        const btnId = {
            memoId: id
        }
        // console.log(btnId)
        fetch('http://localhost:8000/deleteMemo', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(btnId)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // this.setState({memos:data , dataReturned:true})
            })
        this.fetchDatas();
    }

    componentDidMount() {
        console.log('entered')

        this.fetchDatas();
    }
    render() {
        return (
            <>
                {/* <Consumer> */}
                    <h5><u>{sessionStorage.getItem('date')}</u></h5>
                    <div className='container'>
                        {
                            this.state.dataReturned && this.state.memos.memo.map(item => {
                                console.log(item)
                                // this.setState({dataReturned : false})
                                return <Memos key={item.id} item={item} id={item.id} data={item.memo_body} time={item.timestamp} delete={this.deleteMemo} />
                            })
                        }
                    </div>
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNotes">+
                    </button>
                    <form onSubmit={this.addMemo}>
                        <div className="collapse" id="addNotes">
                            <div className="card card-body">
                                <textarea rows="4" value={this.state.memo} onChange={this.handleChange} name='memo'></textarea>
                            </div>
                            <button className='btn btn-primary' type='submit'>Add to Diary</button>
                        </div>
                    </form>
                    <a className='btn btn-primary float-right' type='button' href='/' >Pick Another Date</a>
                {/* </Consumer> */}
            </>
        )
    }
}

export default Diary