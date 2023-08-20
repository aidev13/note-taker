
const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const express = require('express') // requiring in express
const app = express() // turning express into a variable
const PORT = 3000 // extablishing a PORT number
const db = require('./db/db.json')
const { generaterId } = require('../utils/generateid.js')

app.use(express.static('public')) //middleware - allows brower access to css and js files
app.use(express.json()) //middleware = request json data

//middleware used to parse data 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

//router for creating content
app.post('/api/notes', async (req, res) => {
    
const content = await readFile(path.join(__dirname, 'db', 'db.json'))
console.log(content)

res.send("Post hit")
})

//route listener
app.listen(PORT, () => {
    console.log(`Express Listening on http://localhost:${PORT}`)
})