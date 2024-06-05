require('dotenv').config();
const express = require('express');
const { CosmosClient } = require('@azure/cosmos');

// Initialize Express app
const app = express();
const port = 3000;

// Configure your Cosmos DB client
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

// Define database and container
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

// Route to fetch and display data from Cosmos DB
app.get('/', async (req, res) => {
  try {
    const database = client.database(databaseId);
    const container = database.container(containerId);
    const querySpec = {
      query: 'SELECT * from c'
    };

    // Query the database
    const { resources: items } = await container.items.query(querySpec).fetchAll();

    // Send the results as a JSON response
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data from Cosmos DB');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

