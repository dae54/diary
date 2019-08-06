import React from 'react'

function fetchAllEntries() {
    //authenticate
    //fetch all entries
    const data = {
        uuid: sessionStorage.getItem('uuid')
    }
    console.log(sessionStorage.getItem('u') )
    if(data.uuid!=null){
        fetch('http://localhost:8000/fetchAllMemo', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // if (data.accepted) {

            // }
            return <fin></fin>
        })
    }
    
}

function allMemo() {
    return (
        <>
            <div className='jumbotron text-center'>
                <button className='btn btn-info' onClick={fetchAllEntries}>view all entries</button>
            </div>
        </>
    )
}

export default allMemo