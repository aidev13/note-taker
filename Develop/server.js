
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000
const db = require('./db/db.json')

app.use(express.static('public'))

//router for index.html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

//router for notes.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'notes.html'))
})

//router for API/notes to render db.json
app.get('/api/notes', (req, res) => {
    res.json(db)
})


//router to redirect to index.html

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})


//route listener
app.listen(PORT, () => {
    console.log(`Express Listening on http://localhost:${PORT}`)
})