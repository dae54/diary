const express = require('express')
var BodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors());
app.use(BodyParser.json());


const {createAccount, login} = require('./userController/index')
const {uploadMemo, fetchMemo} = require('./uploads/upload_memo')
//createAccount
app.post('/createAccount',(req,res)=>{
    // console.log(req.body)
    createAccount(req,res);
})

//login
app.post('/login',(req,res)=>{
    login(req,res);
})

//uploading memo_body
app.post('/memo_upload',(req,res)=>{
    uploadMemo(req,res);
})

app.post('/fetchMemo',(req,res)=>{
    fetchMemo(req,res);
})

//listening port
app.listen(8000,()=>{
    console.log("server running at port 8000")
})