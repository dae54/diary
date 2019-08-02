import React, { Component } from 'react'
import Memos from './Memos'

class Diary extends Component {
    constructor(){
        super()
        this.state={
            memo:'',
            memos:{}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(e){
        const toDbs = {
            memoBody: this.state.memo,
            uuid:sessionStorage.getItem('uuid')
        }
        e.preventDefault();
        fetch('http://localhost:8000/memo_upload',{
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(toDbs)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
        })
        //clearing the textfield after adding the content to the db
        this.setState({
            memo:''
        })
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        const memo_details={
            uuid:this.props.match.params.uuid,
            time:sessionStorage.getItem('date')
        }
        fetch('http://localhost:8000/fetchMemo',{
            headers:{
                'Content-type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(memo_details)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
            this.setState({memos:data})
        })
    }
    
    render() {
        if(this.state.memos != null){
            // return memoData = this.state.memos.memo
        }
        
        // console.log(memoData)
        return (
            <>
                
                <h5><u>{sessionStorage.getItem('date')}</u></h5>

                <div className='row'>
                    {
                        // console.log(memoData)
                        // if(memoData.length !=0){
                            // memoData.map()
                        // }
                        
                        // this.state.memos.memo.map()
                        // this.state.memos.memo.map(item =>(
                        // <Memos/>
                    // ))
                    }
                </div>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#addNotes">+
                </button>
                <form onSubmit={this.handleSubmit}>
                <div className="collapse" id="addNotes">
                    <div className="card card-body">
                            <textarea rows="4" value={this.state.memo} onChange={this.handleChange} name='memo'></textarea>
                    </div>
                    <button className='btn btn-primary' type='submit'>Add to Diary</button>
                </div>
                </form>
            </>
        )
    }
}

export default Diary