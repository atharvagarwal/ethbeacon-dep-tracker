const mongoose= require('mongoose')

const {MONGO_URL}=process.env



exports.connect = ()=>{
    mongoose.connect(MONGO_URL)
    .then(
        console.log('Database Connected')
    )
    .catch(err=>{
        console.log('connection failed: ' + err)
        process.exit(1)
    })
}