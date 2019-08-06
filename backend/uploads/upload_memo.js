const { connection } = require('../config/Db')

//uploading a memo to diary
exports.uploadMemo = function (req, res) {
    const Body = {
        memoBody: req.body.memoBody,
        uuid: req.body.uuid,
        due_date:req.body.due_date
    }
    console.log(Body)
    const sql = `INSERT INTO diary.memo (user_id, memo_body, due_date) VALUES 
    ((SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}),'${Body.memoBody}','${Body.due_date}')`
    console.log(sql)
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error)
            res.json({ error: error.sqlMessage })
        } else {
            res.json({ accepted: true })
        }
    })
}
//getting the memo from diary
exports.fetchMemo = function (req, res) {
    console.log('entered here')
    //user_id,uuid,body,timestamp
    const Body = {
        uuid: req.body.uuid,
        due_date: req.body.due_date
    }
    // const sql = `INSERT INTO diary.memo (user_id, memo_body) VALUES ((SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}),'${Body.memoBody}')`
    // const user_id  = `SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}`
    const sql = `SELECT id, memo_body, timestamp FROM diary.memo WHERE user_id=(SELECT id FROM diary.users 
        WHERE uuid=${connection.escape(Body.uuid)}) AND due_date='${Body.due_date}';`
    console.log(sql)
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
            res.json({error:error.sqlMessage})
        }
        else{
            console.log(result)
            res.json({memo:result})
        }
    })
}

exports.deleteMemo = function(req,res){
    console.log(req.body)
    const memoToDelete = req.body.memoId
    const sql = `DELETE FROM diary.memo WHERE (id = ${memoToDelete});`
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
            res.json({error:error.sqlMessage,deleted:false})
        }else{
            console.log(result)
            console.log('deleated')
            res.json({Deleted: true})
        }
    })
}

exports.fetchAllMemo = function (req, res) {
    console.log('entered here')
    //user_id,uuid,body,timestamp
    // const Body = {
        const uuid= req.body.uuid
    // }

    const sql = `SELECT id, memo_body, timestamp FROM diary.memo WHERE user_id=(SELECT id FROM diary.users 
        WHERE uuid=${connection.escape(uuid)});`
    console.log(sql)
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
            res.json({error:error.sqlMessage})
        }
        else{
            console.log(result)
            res.json({memo:result})
        }
    })
}