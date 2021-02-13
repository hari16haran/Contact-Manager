const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.json({msg:"welcome new node project"});
});

//Define Route

app.use('/api/users',require('./route/users'))
app.use('/api/auth',require('./route/auth'))
app.use('/api/contacts',require('./route/contact'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`port is listening in ${PORT}`)   )