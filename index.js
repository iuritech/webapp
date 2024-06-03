var express = require('express')
var app = express()
const port = process.env.PORT || 3000

// new variables
const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('public'))
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port ${port}!');
});
