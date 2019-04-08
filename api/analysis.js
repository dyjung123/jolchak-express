const models = require('../models/emotionData')
const seque = require('sequelize')

const addData = async (req, res, next) => {
    // console.log(req.body)
    const {imageName,userId,uploadDate,downloadURL,Confidence,HAPPY,CALM,SAD,
        DISGUSTED,CONFUSED,ANGRY,SURPRISED} = req.body
    // await -> 동기
    await models.EmotionData.sync() // singleton pattern

    const emoData = models.EmotionData.build({UID:userId, imageId:imageName, createDate:uploadDate, 
        happy:HAPPY, sad:SAD, angry:ANGRY, calm:CALM, disgusted:DISGUSTED, surprised:SURPRISED, 
        confused:CONFUSED, confi:Confidence, downlink: downloadURL})
    await emoData.save().catch((e)=>{ // save commit
        console.log('error')
        console.log(e)
    }).then((r)=>{
        console.log('then')
        console.log(r)
    })
    res.status(201).json({ item: emoData })
}

const findAll = async (req,res,next)=>{
    models.EmotionData.findAll().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500) // status 설정해서 보여줌, router로 상태에 따라서 redirect가능
    })
}

const findRecord = async (req,res,next) => {
    console.log('req', req.body)
    const {term, uid} = req.body
    models.EmotionData.findAll({
        attributes: ['createDate',[seque.fn('ROUND', seque.fn('AVG', seque.col('happy')), 1), 'happyavg'],
        [seque.fn('ROUND', seque.fn('AVG', seque.col('sad')), 1), 'sadavg'],[seque.fn('ROUND', seque.fn('AVG', seque.col('angry')), 1), 'angryavg'],
        [seque.fn('ROUND', seque.fn('AVG', seque.col('calm')), 1), 'calmavg'],[seque.fn('ROUND', seque.fn('AVG', seque.col('disgusted')), 1), 'disgustedavg'],
        [seque.fn('ROUND', seque.fn('AVG', seque.col('surprised')), 1), 'surprisedavg'],[seque.fn('ROUND', seque.fn('AVG', seque.col('confused')), 1), 'confusedavg'],
        [seque.fn('ROUND', seque.fn('AVG', seque.col('confi')), 1), 'confidenceavg']],
        where: {uid,createdAt:{between: [new Date()-term,new Date()]}},
        group: ['createDate']
    }).then(data=>{
        res.send(data)
    })
    
}

const getImage = async (req,res,next) => {
    console.log('getImage', req.body)
    const {uid} = req.body
    models.EmotionData.findAll({
        attributes: ['downlink'],
        where: {uid}
    }).then(data=>{
        res.send(data)
    })
}

module.exports = {
    addData,
    findAll,
    findRecord,
    getImage
}