const models = require('../models/user')
const authService = require('../auth.js')

const login = async (req, res, next) => {
    const { email, password } = req.body
  
    const user = await models.User.findOne({
      where: { email, password } // <-이름:값 전부 가져옴  {email:email, password:password}
    })
  
    if (!user) return res.status(401).json({ error: 'Login failure' })
  
    const accessToken = authService.signToken(user.id)
    res.json({ accessToken, user })
}

const create = async (req,res,next)=>{
    const {userid,username,userpassword} = req.body
    // await -> 동기
    await models.User.sync() // singleton pattern

    const user = models.User.build({email:userid,name:username,password:userpassword})
    await user.save().catch((e)=>{ // save commit
        console.log('error')
        console.log(e)
    }).then((r)=>{
        console.log('then')
        console.log(r)
    })
    res.status(201).json({ item: user })
}

// userid로 검색
const findOne = async (req,res,next)=>{

    const idnum = req.params.idnum
    
    models.User.findOne({
        where: { idnum: idnum }
    }).then((m)=>{
        res.json(m.dataValues)
        // console.log('findOne : '+m.dataValues)
    }).catch((err)=>{
        res.send(err)
    })
}

const findAll = async (req,res,next)=>{
    models.User.findAll().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500) // status 설정해서 보여줌, router로 상태에 따라서 redirect가능
    })
}

const deleteOne = async (req,res,next)=>{
    const {idnum} = req.body
    models.User.destroy({
        where: { idnum: idnum }
    }).then((d)=>{
        console.log(d)
    })
}

module.exports = {
    create,
    findOne,
    findAll,
    deleteOne,
    login
}