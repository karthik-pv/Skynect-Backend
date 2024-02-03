import mongoose from 'mongoose';

const connectToMongo = async (URL , dbName) => {
    try {
        await mongoose.connect(URL, {
            dbName
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongo