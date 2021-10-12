const express = require('express');
const {urlencoded ,json} = require('body-parser')
const mongoose =require('mongoose')
const root=require('./routes/root')

const db=require('./configs/config').MONGO_URI

const app = express();
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))

// parse application/json
app.use(json())

const port=process.env.PORT || 3000

app.use('/',root)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log("DB connected")).catch(err => console.log(err));





app.listen(port, () => {
    console.log("server running "+port)
})





