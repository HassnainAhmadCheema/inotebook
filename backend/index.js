const connectToMongo = require("./db");

var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 5000



app.use(cors())


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.use("/api/notes",require("./routes/notes"));
app.use("/api/auth",require("./routes/auth"));

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`)
})
