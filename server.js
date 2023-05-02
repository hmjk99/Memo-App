const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Memo = require('./models/schema.js')
const path = require('path');
const app = express()
const db = mongoose.connection;
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'));

// ============== index ================
app.get('/memo', (req, res)=>{
    Memo.find({}).sort({date:1}).then((foundMemo)=>{
        res.render('index.ejs', {data: foundMemo})
    })
})

// ============== new ================
app.get('/memo/new', (req, res)=>{
    res.render('new.ejs')
})

// ============== edit ================
app.get('/memo/:id/edit', (req, res)=>{
    Memo.findById(req.params.id).then((foundMemo)=>{
        res.render('edit.ejs', {data: foundMemo})
    })
})

// ============== show ================
app.get('/memo/:id', (req, res)=>{
    Memo.findById(req.params.id).then((foundMemo)=>{
        res.render('show.ejs', {data: foundMemo})
    })
})


// ============== request for memo ================
app.post('/memo', (req, res)=>{
    Memo.create(req.body).then(()=>{
        res.redirect('/memo')
    })
})

app.delete('/memo/:id', (req, res)=>{
    Memo.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect('/memo')
    })
})

app.put('/memo/:id', (req, res)=>{
    Memo.findByIdAndUpdate(req.params.id, req.body).then(()=>{
        res.redirect(`/memo/${req.params.id}`)
    })
})


//================= connection ================
mongoose.connect(MONGODB_URI)

app.listen(PORT, ()=>{
    console.log('listening....')
})