const { connection } = require('../config/Db')

//uploading a memo to diary
exports.uploadMemo = function (req, res) {
    const Body = {
        memoBody: req.body.memoBody,
        uuid: req.body.uuid,
    }
    console.log(Body)
    const sql = `INSERT INTO diary.memo (user_id, memo_body) VALUES ((SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}),'${Body.memoBody}')`
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
    //user_id,uuid,body,timestamp
    const Body = {
        uuid: req.body.uuid,
        timestamp: req.body.time
    }
    // const sql = `INSERT INTO diary.memo (user_id, memo_body) VALUES ((SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}),'${Body.memoBody}')`
    // const user_id  = `SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)}`
    const sql = `SELECT id, memo_body, timestamp FROM diary.memo WHERE user_id=(SELECT id FROM diary.users WHERE uuid=${connection.escape(Body.uuid)});`
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