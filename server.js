const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Memo = require('./models/schema.js')


const app = express()
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

// ============== index ================
app.get('/memo', (req, res)=>{
    Memo.find({}).then((foundMemo)=>{
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


// ============== requests ================
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

mongoose.connect('mongodb://localhost:27017/Memo').then(() => {
   console.log('conneciton with mongo established')
})

app.listen('3000', ()=>{
    console.log('listening....')
})