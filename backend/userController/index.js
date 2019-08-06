const { connection } = require('../config/Db')

const uuidv1 = require('uuid/v1');

exports.createAccount = function (req, res) {


    console.log('*****createAccount*****')
    // console.log(req.body)
    var toDbs = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        uuid: uuidv1()
    }
    var sql = 'INSERT INTO diary.users SET ?'
    connection.query(sql, toDbs, (error, result) => {
        if (error) {
            console.log(error.sql)
            // console.log(`the error: ${error.sqlMessage}`)
            // console.log(`errno ${error.errno}`)
            // console.log(`errno ${error.sqlState}`)
            res.json({ error: `${error.sqlMessage}`, accepted: false });
        } else {
            console.log('done')
            res.json({ accepted: true });
        }
    })
}

exports.login = function (req, res) {
    console.log('*****login*****')
    console.log(req.body);
    var creds = {
        email: req.body.email,
        password: req.body.password
    }
    var sql = `SELECT * FROM diary.users WHERE 
    email=${connection.escape(creds.email)} AND 
    password=${connection.escape(creds.password)}`
    console.log(sql)
    connection.query(sql, (error, result, fields) => {
        if (error) {
            res.json({ error: `${error.sqlMessage}` });
        } else {
            console.log(result)
            // console.log('length ',result.length)
            if (result.length === 0) {
                res.json({ accepted: false, comment: 'incorrect email or password' })
            } else if (result.length === 1) {
                if (result[0].email === creds.email) {
                    const uuid = result[0].uuid
                    res.json({ accepted: true, uuid })
                }
            } else {
                res.status(200).json({ accepted: false, comment: 'fraud detected' })
            }
        }
    })
}

exports.userDetails = function (req, res) {
    console.log('*****userDetails*****')
    // console.log(req.body);
    var creds = {
        uuid: req.body.uuid,
    }
    // console.log(creds.uuid)
    var sql = `SELECT email FROM diary.users WHERE uuid=${connection.escape(creds.uuid)}`
    console.log(sql)
    connection.query(sql, (error, result, fields) => {
        if (error) {
            res.json({ error: `${error.sqlMessage}` });
        } else {
            console.log(result)
            const email = result[0].email
            res.json({ accepted: true, email })
        }
    })
}