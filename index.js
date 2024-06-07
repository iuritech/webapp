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

app.get('/items', async function (req, res) {
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

    // Generate HTML for each item
    const html = resources.map(item => `
      <div class="col-lg-4 col-sm-6">
        <a class="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg" title="${item.id}">
          <img class="img-fluid" src="https://simoesstorage.blob.core.windows.net/mycontainer/${item.id}.jpg" alt="...">
          <div class="portfolio-box-caption">
            <div class="project-category text-white-50">Category</div>
            <div class="project-name">${item.id}</div>
          </div>
        </a>
      </div>
    `).join('');

    // Send the generated HTML as response
    res.send(html);
  } catch (err) {
    console.error('Error reading from Cosmos DB', err);
    res.status(500).send('Error reading from Cosmos DB');
  }
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
    res.send(resources);
  } catch (err) {
    console.error('Error reading from Cosmos DB', err);
    res.status(500).send('Error reading from Cosmos DB');
  }
});

// Start the server
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

