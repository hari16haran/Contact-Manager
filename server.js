const express = require('express');
const connectDb = require('./config/db');
const app = express();


//Connect MongoDb

connectDb();

//MiddleWare

app.use(express.json({extended:false}));

//Define Route

app.use('/api/users',require('./route/users'))
app.use('/api/auth',require('./route/auth'))
app.use('/api/contacts',require('./route/contact'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`port is listening in ${PORT}`)   )