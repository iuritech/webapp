const express = require('express');
const { CosmosClient } = require('@azure/cosmos');

const app = express();
const port = process.env.PORT || 3000;

// Your Cosmos DB configuration
const endpoint = process.env.COSMOS_DB_ENDPOINT; // Cosmos DB endpoint
const key = process.env.COSMOS_DB_KEY; // Cosmos DB key
const databaseId = process.env.COSMOS_DB_DATABASE; // Cosmos DB database ID
const containerId = process.env.COSMOS_DB_CONTAINER; // Cosmos DB container ID
// Initialize Cosmos client
const client = new CosmosClient({ endpoint, key });

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route to get items from the container
app.get('/artigos', async (req, res) => {
    try {
        const { resources: items } = await client
            .database(databaseId)
            .container(containerId)
            .items.query('SELECT * FROM items')
            .fetchAll();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving items');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

