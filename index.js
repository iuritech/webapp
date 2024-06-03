// Author: Osvaldo Santos oas@ipcb.pt

// First you have to create a folder for the project
//      mkdir filtros
//      cd filtros

// Then, you have to install the module to connect to Azure Cosmos DB
//      npm install @azure/cosmos

// And also the module to read environment variables
//      npm install dotenv

// You also have to create the .env file where the environment variables will be defined
//      nano .env
// And inside the .env file, you must add two variables, with the values obtained from Azure.
// The following values are only examples, replace with your own values
//      COSMOS_ENDPOINT="https://cosmos-vitor783457.documents.azure.com:443/"
//      COSMOS_KEY="X1SE9PKSJhh2VFiueZAgArxb6Db7MRWLq4bulL1wdR1oMVkzkvHmi1phD9I1ZTgzUwRFJv4JsjauACDbi32UTg=="


// Module imports
require('dotenv').config()
const CosmosClient = require('@azure/cosmos').CosmosClient

// This function is an example of how to interface with Cosmos DB
async function read_data_from_cosmos_db() {

    // Provide required connection from environment variables in the .env file
    const key = process.env.COSMOS_DB_KEY;
    const endpoint = process.env.COSMOS_DB_ENDPOINT=;

    console.log(`Using the endpoint: ${endpoint}`);

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });

    // Get the database object
    const db=cosmosClient.database('tonytectosDB');

    // Get the container object
    const container=db.container('tonytectosContainer');

    // preparing the query
    const querySpec = {
        query: 'SELECT * FROM tonytectosContainer'
    };

    // Get items
    const { resources } = await container.artigos.query(querySpec).fetchAll();

    // Print headings
    console.log(`\nReference \t Manufacturer \t Stock \t Minimum`);

    // show the results
    for (const item of resources) {
        console.log(`${item.codigo_EAN} \t ${item.fabricante}   \t ${item.stock_atual} \t ${item.stock_minimo} `);
    }

}

// call the function
read_data_from_cosmos_db();

