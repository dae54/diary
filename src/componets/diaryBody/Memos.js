import React from 'react'

function Memos(props) {
    // console.log(props)
    const handleClick = (e) => {
        if (window.confirm('are you sure you want to delete this memo from diary?\nNO UNDO')) {
            props.delete(e.target.id)
        }
    }
    return (
        <>
            {/* <div className='container '> */}
                <div className='row '>
                    <div className='col'>
                        <div className="card mb-5">
                            <div className="card-header">{props.time}</div>
                            <div className="card-body">
                                <h5 className="card-title">{props.data}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        {/* onClick={e => this.reply_click(e.target.id)} */}
                        <button className='btn btn-danger' id={props.id} onClick={handleClick}>delete</button>
                    </div>
                </div>
            {/* </div> */}
            {/* {confirmLoaded} */}
        </>
    )
}

export default Memos
        // onContextMenu={handleClick}