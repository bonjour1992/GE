import express from 'express'
import * as element from "./element.js"
import * as remp from "./remp.js"



import { DB, DBInit } from './db.js';
import { config } from 'dotenv';
import cors from 'cors'
import { csstoarray } from './temp/script.js';



//load .env
config()

//connect to DB
DBInit()
element.db.elements = (await DB).collection("element")
element.db.ids = (await DB).collection("ids")
remp.db.remplacement = (await DB).collection("remplacement")

//scripting


//API

const app = express()
app.use(cors());
app.use('/public', express.static('public'))
app.use(express.json())

app.get('/element/:id', async (req, res) => {
  let carte = await element.getElement(req.params.id)
  if (carte) res.json(carte)
  else res.status(404).json(null)
})

app.post('/element/:id', async (req, res) => {
  let data = await req.body;
  element.save(await element.buildElement(data.content, data.meta.jeu, data.meta.type, parseInt(req.params.id), 0, "UPDATED"))
  res.json({ message: "Element updated with id:" + req.params.id, id: req.params.id, action: "UPDATE" });
})

app.delete('/element/:id', (req, res) => {

  res.send('Hello World')
})

app.post('/element/new', (req, res) => {

  res.send('Hello World')
})


app.get('/remp/:jeu', async (req, res) => {

  res.json(await remp.getAll(req.params.jeu))

})

app.get('/element/search/:jeu', async (req, res) => {
  res.json(await element.getSearch(req.params.jeu))
})

app.get('/element/:jeu/:type', async (req, res) => {
  res.json(await element.getListElement(req.params.jeu, req.params.type))
})


app.post('/remp/update/:jeu', async (req, res) => {
  let data = await req.body;
  await remp.update(data, req.params.jeu)
  res.json(await remp.getAll(req.params.jeu))

})



app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

