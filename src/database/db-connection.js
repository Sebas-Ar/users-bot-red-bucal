const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

const mongoConnect = async () => {
    const { RED_BUCAL_MONGODB_HOTS, RED_BUCAL_MONGODB_DATABASE } = process.env
    const MONGODB_URI = `mongodb://${RED_BUCAL_MONGODB_HOTS}/${RED_BUCAL_MONGODB_DATABASE}`
    
    
    const client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    try {
        if (!client.isConnected()) {
            await client.connect()
            return {
                db: client.db('red-bucal-database'),
                client
            }
        } else {
            return {
                db: client.db('red-bucal-database'),
                client
            }
        }
    } catch (error) {
        console.log(error)
    }    

}

module.exports = mongoConnect