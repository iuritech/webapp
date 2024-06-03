var express = require('express')
var app = express()
const port = process.env.PORT || 3000

// new variables
const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
});

app.use(express.static('public'))
const app = express();
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port ${port}!');
});
