import React from 'react'

function ReferMemo(props) {
    return (
        <>
            <div>
                <div className="border mb-2">
                    <div className="toast-header">
                        <strong className="mr-auto">1<sup>st</sup> Week (1 to 8) July,2019</strong>
                        <span className="">10</span>
                        {/* <small>11 mins ago</small> */}
                    </div>
                    <div className="toast-body">
                        urgent  7
                        important 8
                        <button className='btn btn-info float-right'>Quick add </button>
                    </div>
                </div>
            </div>
        </>
    )
}
// export function ViewModel(props){
//     return(
//         <div className='jumbotron'>
//             {/* helo extra */}
//         </div>
//     )
// }


export default ReferMemo
