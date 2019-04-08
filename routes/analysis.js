const express = require('express')
const bodyparser = require('body-parser')
const analysisRouter = express.Router()

const analysisApi = require('../api/analysis')

analysisRouter.use(bodyparser.urlencoded({ extended: true }))

analysisRouter.use((req, res, next) => {
    console.log('Time : ',Date.now())
    next()
})

analysisRouter.post('/getimage',analysisApi.getImage)
analysisRouter.post('/addata',analysisApi.addData)
analysisRouter.post('/findrec',analysisApi.findRecord)

analysisRouter.get('/info/',analysisApi.findAll)

module.exports = {
    analysisRouter
}