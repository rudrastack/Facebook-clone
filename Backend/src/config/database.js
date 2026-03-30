require("dotenv").config()
const mongoose = require('mongoose')

async function ConnectToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to the db")
}

module.exports = ConnectToDb;
