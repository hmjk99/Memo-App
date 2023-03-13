const mongoose = require('mongoose')

const memoSchema = new mongoose.Schema({
    date: String,
    title: String,
    text: String,
})

const memo = mongoose.model('Memo', memoSchema);

module.exports = memo;