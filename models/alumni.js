const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AlumniSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name is required!']
    },
    mail: {
        type: String,
        required: [true, 'Email is required']
    },
    contact: {
        type: Number,
        required: [true, 'Number is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    admnno: {
        type: String,
        required: [true, 'Admnno required!']
    },
    password: {
        type: String
    },
    username: {
        type: String
    }
})

const Alumni = mongoose.model('alumni',AlumniSchema)
module.exports = Alumni