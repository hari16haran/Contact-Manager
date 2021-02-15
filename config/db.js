const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')

const connectDb = async () =>{
    try{
        await mongoose
            .connect(db,{
            useNewUrlParser : true,
            useCreateIndex : true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('MongoDb connected successfully');
    } catch(err) {
        console.error('Error Mongo',err.message);
        process.exit(1);
    }
}  

module.exports = connectDb;