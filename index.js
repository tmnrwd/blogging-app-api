const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors');
const { restart } = require('nodemon')
const { User } = require('./models/user');
const { v4: uuidv4 } = require('uuid');
const { search } = require('./router');

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(router);

app.use(async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({token: authHeader})
    if (user) {
      next()
    } else { res.sendStatus(403) }
  })

app.post('/auth', async (req, res) => {
    //console.log("triggered authenticate. username:", req.body.username, "password:", req.body.password, "header:", req.headers['authorization'])
    const userSearch = await User.findOne({username: req.body.username})
    if (!userSearch) {
        console.log("user not found")
        return res.sendStatus(401)
    }
    if (req.body.password != userSearch.password){
        console.log("Password wrong")
        return res.sendStatus(403)
    }
    userSearch.token = uuidv4()
    await userSearch.save()
    res.send({token: userSearch.token})
})

app.post('/auth', async (req, res) => {
    //console.log("triggered authenticate. username:", req.body.username, "password:", req.body.password, "header:", req.headers['authorization'])
    const userSearch = await User.findOne({username: req.body.username})
    if (!userSearch) {
        console.log("user not found")
        return res.sendStatus(401)
    }
    if (req.body.password != userSearch.password){
        console.log("Password wrong")
        return res.sendStatus(403)
    }
    userSearch.token = uuidv4()
    await userSearch.save()
    res.send({token: userSearch.token})
})

/*
let testUser = new User({username: "test", password: "testPW"})
testUser.save()
.then(doc => {
    console.log(doc)
})


 User.findOne({username: "bob"})
.then(doc => {
    console.log(doc)
})
*/


app.listen(port, () => 
console.log(`Example app listening at http://localhost:${port}`))
//listening to the port for the thing we sent (I think)
//mongoose.connect('mongodb://localhost/eventlist')
mongoose.connect('mongodb+srv://bob:turnip@cluster0.fsbwp.mongodb.net/postlist?retryWrites=true&w=majority')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Database connected")
});