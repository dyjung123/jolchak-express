const express = require('express')
var cors = require('cors');
const app = express()
const port = 3003

const {userRouter} = require('./routes/user')
const {analysisRouter} = require('./routes/analysis')

app.use(express.json())
app.use(cors());

app.use(express.static('public')) // 기본 호스팅 경로.
app.use('/user',userRouter) // 라우팅 설정
app.use('/analysis',analysisRouter)

app.listen(port, ()=>{
    console.log("Server "+port+"is start....")
})
