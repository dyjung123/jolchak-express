/* /routes: 라우팅을 위한 폴더입니다. 라우팅 리소스 별로 모듈을 만들어 라우팅 로직을 각 파일에 구현 합니다. 그 중 /routes/index.js 파일을 살펴 봅시다. */
/* index.js 는 package.json에서 app.js로 수정 */
const express = require('express')
const bodyParser = require('body-parser')
const userRouter = express.Router()

const userApi = require('../api/user')

// 바디파서 사용 명시
userRouter.use(bodyParser.urlencoded({ extended: true}))

// middleware that is specific to this userRouter
userRouter.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next() // next: 다음 로직 수행을 위한 함수명
})

userRouter.post('/create',userApi.create)

userRouter.post('/login',userApi.login)

userRouter.get('/info/',userApi.findAll)
userRouter.get('/info/:idnum',userApi.findOne) // userApi에서의 findOne 호출
userRouter.delete('/delete/',userApi.deleteOne)

module.exports = {
    userRouter
}