const connectToMongo = require('./database/db');

const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

connectToMongo();
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/video', require('./routes/video'));
app.use('/api/create', require('./routes/create'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})