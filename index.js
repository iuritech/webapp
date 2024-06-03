// Module imports
require('dotenv').config()
const CosmosClient = require('@azure/cosmos').CosmosClient

// This function is an example of how to interface with Cosmos DB
async function read_data_from_cosmos_db() {

    // Provide required connection from environment variables in the .env file
    const key = process.env.COSMOS_DB_KEY;
    const endpoint = process.env.COSMOS_DB_ENDPOINT;

    console.log(`Using the endpoint: ${endpoint}`);

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });

    // Get the database object
    const db=cosmosClient.database('tonytectosDB');

    // Get the container object
    const container=db.container('tonytectosContainer');

    // preparing the query
    const querySpec = {
        query: 'SELECT * FROM Items'
    };

    // Get items
    const { resources } = await container.items.query(querySpec).fetchAll();

    // Print headings
    console.log(`\nReference \t Manufacturer \t Stock \t Minimum`);

    // show the results
    for (const item of resources) {
        console.log(`${item.artigo}`);
    }

}

// call the function
read_data_from_cosmos_db();

