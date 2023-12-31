

const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const express = require('express') // requiring in express
const app = express() // turning express into a variable
const PORT = process.env.PORT || 3000 //port setup for heroku with fallback

const { generateId } = require('./utils/generateid')

//middleware used to parse data 
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //middleware = request json data
app.use(express.static('public')) //middleware - allows brower access to css and js files


//router for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//router for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//router for API/notes to render db.json
app.get('/api/notes', async (req, res) => {
    const content = await readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    const notes = JSON.parse(content)
    res.json(notes)
})

//for deleting
app.delete('/api/notes/:id', async (req, res) => {
    const id = parseFloat(req.params.id)
    const content = await readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    const notes = JSON.parse(content)
    const noteIndex = notes.findIndex(note => {
        return note.id === id
    })

    notes.splice(noteIndex, 1)
    await writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes, null, 2))
    
    res.json({})
})

//router for creating content
app.post('/api/notes', async (req, res) => {
    const content = await readFile(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    const notes = JSON.parse(content)

    const newNote = {
        ...req.body,
        id: generateId()
    }

    notes.push(newNote)
    await writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes, null, 2))
    // readFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(note, null, 2)) //this line works to push to side bar, but Im not sure if there is another way...

    res.status(201).json(newNote)

})

//router to redirect to index.html when a 404 type param is typed 
//this router should be last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//route listener
app.listen(PORT, () => {
    console.log(`Express Listening on http://localhost:${PORT}`)
})