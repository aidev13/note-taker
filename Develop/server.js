

const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const express = require('express') // requiring in express
const app = express() // turning express into a variable
const PORT = 3000 // extablishing a PORT number
const db = require('./db/db.json')
const { generateId } = require('../utils/generateid')

//middleware used to parse data 
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //middleware = request json data
app.use(express.static('public')) //middleware - allows brower access to css and js files


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
    const content = await readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8')
const note = JSON.parse(content)

const newNote = {
    ...req.body,
    id: generateId()
}
note.push(newNote)
await writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(note, null, 2))
readFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(note, null, 2)) //this line works to push to side bar, but Im not sure if there is another way...

res.status(201).json(newNote)

})


//route listener
app.listen(PORT, () => {
    console.log(`Express Listening on http://localhost:${PORT}`)
})