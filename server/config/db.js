const mongoose = require('mongoose')
const colors = require ('colors')

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL_LOCAL)
        console.log(`Connected To Database ${mongoose.connection.host}`.bgGreen.white);


    } catch(error) {
        console.log('error in connection DB $(error)'.bgRed.white)
    }
}

module.exports = connectDB