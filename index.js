// Module imports
require('dotenv').config();
const { CosmosClient } = require('@azure/cosmos');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get data from Cosmos DB
app.get('/data', async function (req, res) {
  try {
    // Provide required connection from environment variables in the .env file
    const key = process.env.COSMOS_KEY;
    const endpoint = process.env.COSMOS_ENDPOINT;

    if (!key || !endpoint) {
      throw new Error('Cosmos DB endpoint and key must be provided in environment variables');
    }

    console.log(`Using the endpoint: ${endpoint}`);

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });

    // Get the database object
    const db = cosmosClient.database('tonytectosDB');

    // Get the container object
    const container = db.container('tonytectosContainer');

    // Preparing the query
    const querySpec = { query: 'SELECT * FROM c' };  // Using 'c' as the alias for the items

    // Get items
    const { resources } = await container.items.query(querySpec).fetchAll();

    // Send the results as JSON
    res.json(resources);
  } catch (err) {
    console.error('Error reading from Cosmos DB', err);
    res.status(500).send('Error reading from Cosmos DB');
  }
});

// Start the server
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

