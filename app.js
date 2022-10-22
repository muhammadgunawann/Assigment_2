const express = require('express');
const app = express();
const router = require("./routes/index")
const port = 8000;
require('dotenv').config()

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log('server is listening on port', port);
});