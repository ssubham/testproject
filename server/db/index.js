const mongoose = require('mongoose');

const config = require('../config');

mongoose
    .connect(config.server.database, { useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
