import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import connectToMongo from './utils/connectToMongoDB.js'
import router from './routes/router.js'

const {PORT , MONGO_URL} = process.env

const app = express()

const initiate = async() => {

await connectToMongo(MONGO_URL,'Skynet')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/Skynect/api/v1/',router)

    app.listen(PORT , ()=>{
        console.log(`Server is running on port ${PORT}`)
    })

}

initiate();