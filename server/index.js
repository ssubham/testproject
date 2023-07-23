const express = require('express')
const cors = require('cors');
const path = require('path');

const config = require('./config');

//console.log(config.emailconfig);
module.exports =  {
    config
};

// Database connection
const db = require('./db');
//Specific Routes....
const userRouter = require('./routes/user.routes');
const app = express()
const apiPort = 5000;

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({extended: true}));
app.use(cors())

// Connection Database.
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// app.get("*", (req, res) =>{
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// })
app.get('/', (req, res) => {
    res.send('Hello World!');
})
const serverpath = config.serversubpath;
//console.log(config.serversubpath)
app.use(serverpath, userRouter); // Getting user Router.

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))