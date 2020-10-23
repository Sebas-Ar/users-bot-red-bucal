const dbConnection = require('./database/db-connection')
const user_query = require('./database/query/user_query')
const {ObjectId} = require('mongodb')
const sendMail = require('./email/alerts')

const main = async () => {

    const connection = await dbConnection() 

    try {
        const user = await connection.db.collection('users').aggregate(user_query).toArray()

        user.forEach(async date => {

            const {end, alerts, _id, email, name} = date

            const now = new Date()

            const one_week_more = new Date(new Date(now).setDate(now.getDate() + 7))

            const one_month_more = new Date(new Date(now).setMonth(now.getMonth() + 1))
            
            if (now < end) {

                console.log('you still have more than a month left')
                sendMail(name, email, 'you still have more than a month left')
                if (one_week_more > end && !alerts.week) {

                    console.log('send alert week')
                    await connection.db.collection('users').findOneAndUpdate({_id: ObjectId(_id)}, {$set: {'alerts.week': true}})
                    
                } else if (one_month_more > end && !alerts.month) {
                    
                    console.log('send alert month')
                    await connection.db.collection('users').findOneAndUpdate({_id: ObjectId(_id)}, {$set: {'alerts.month': true}})

                }

            } else {

                console.log('send alert finished')
                await connection.db.collection('users').findOneAndUpdate({_id: ObjectId(_id)}, {$set: {state: true}})

            }

        })

        /* connection.client.close(true) */

    } catch (error) {

        console.log(error)
        /* connection.client.close(true) */

    }

}

console.time('test')
main()
console.timeEnd('test')