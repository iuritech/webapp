const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port ${port}!');
});
