const {Sequelize, skima} = require('./sequelize')

const EmotionData = skima.define('emotionData', {
    UID: {
        type: Sequelize.STRING,
        notNull : true
    },
    imageId: {
        type: Sequelize.STRING,
        notNull : true,
        primaryKey : true,
    },
    createDate: {
        type: Sequelize.STRING,
        notNull : true
    },
    happy: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    sad: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    angry: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    calm: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    disgusted: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    surprised: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    confused: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    confi: {
        type: Sequelize.FLOAT,
        notNull : true
    },
    downlink: {
        type: Sequelize.STRING,
        notNull : true
    },
    avghappy: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgsad: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgangry: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgcalm: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgdisgusted: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgsurprised: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgconfused: {
        type: Sequelize.FLOAT,
        notNull : false
    },
    avgconfidence: {
        type: Sequelize.FLOAT,
        notNull: false
    }},
    {tableName: 'emotionData'
})

module.exports = {EmotionData}