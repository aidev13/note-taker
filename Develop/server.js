
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3000

//router for index.html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

//router for notes.html

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'notes.html'))
})


app.listen(PORT, () => {
    console.log(`Express Listening on http://localhost:${PORT}`)
})