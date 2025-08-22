const express = require('express')
const app = express()
const PORT = 2121
const MongoClient = require('mongodb').MongoClient
const path = require('path')
require('dotenv').config()

app.set('view engine', 'ejs') // Tell Express to use EJS for rendering views
app.use(express.static('public')) // Let Express serve files from the 'public' folder (CSS, JS, images, etc.)
app.use(express.urlencoded({ extended: true })) // Read form data from POST requests

app.use(express.json())

let db,
    dbCollectionStr = process.env.DB_STRING,
    dbName = 'todos'
  
MongoClient.connect(dbCollectionStr)
.then(client => {
  console.log(`Connected to ${dbName} DataBase`)
  db = client.db(dbName)
})    

app.get('/',(req,res)=>{
  db.collection('todos').find().toArray()
  .then(data => {
    db.collection('todos').countDocuments({completed:false})
    .then(itemsLeft => {
      res.render('index.ejs',{items : data, left : itemsLeft})
    })
  })
  .catch(err => console.log(err))
})


app.post('/addTodo', (req,res) => {
  db.collection('todos').insertOne({thing: req.body.todoItem, completed: false})
  .then(result => {
        console.log('Todo Added')
        res.redirect('/')
    })
    .catch(err => console.log(err))
})



app.listen(PORT,() =>{
    console.log(`Listinig on port ${PORT}`)
})