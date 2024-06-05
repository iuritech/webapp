// require('dotenv').config();
// const express = require('express');
// const { CosmosClient } = require('@azure/cosmos');

// // Initialize Express app
// const app = express();
// const port = 3000;

// // Configure your Cosmos DB client
// const endpoint = process.env.COSMOS_DB_ENDPOINT;
// const key = process.env.COSMOS_DB_KEY;
// const client = new CosmosClient({ endpoint, key });

// // Define database and container
// const databaseId = process.env.DATABASE_ID;
// const containerId = process.env.CONTAINER_ID;

// // Route to fetch and display data from Cosmos DB
// app.get('/', async (req, res) => {
//   try {
//     const database = client.database(databaseId);
//     const container = database.container(containerId);
//     const querySpec = {
//       query: 'SELECT * from c'
//     };

//     // Query the database
//     const { resources: items } = await container.items.query(querySpec).fetchAll();

//     // Send the results as a JSON response
//     res.json(items);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while fetching data from Cosmos DB');
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });
// Module imports
require('dotenv').config()
const CosmosClient = require('@azure/cosmos').CosmosClient

// This function is an example of how to interface with Cosmos DB
async function read_data_from_cosmos_db() {

    // Provide required connection from environment variables in the .env file
    const key = process.env.COSMOS_KEY;
    const endpoint = process.env.COSMOS_ENDPOINT;

    console.log(`Using the endpoint: ${endpoint}`);

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });

    // Get the database object
    const db=cosmosClient.database('tonytectosDB');

    // Get the container object
    const container=db.container('tonytectosContainer');

    // preparing the query
    const querySpec = {
        query: 'SELECT * FROM c'
    };

    // Get items
    const { resources } = await container.items.query(querySpec).fetchAll();

    // Print headings
    console.log(`\nReference \t Manufacturer \t Stock \t Minimum`);

    // show the results
    for (const item of resources) {
        console.log(`${item.id} ${item.artigos}`);
    }

}

// call the function
read_data_from_cosmos_db();

