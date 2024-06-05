
// Module imports
require('dotenv').config()
const CosmosClient = require('@azure/cosmos').CosmosClient

// codigo filtros dá erro no deploy do azure mas funciona com npm index.js

    // Provide required connection from environment variables in the .env file
    const key = process.env.COSMOS_KEY;
    const endpoint = process.env.COSMOS_ENDPOINT;

//    console.log(`Using the endpoint: ${endpoint}`);

    // Authenticate to Azure Cosmos DB
    const cosmosClient = new CosmosClient({ endpoint, key });

    // // Get the database object
    // const db=cosmosClient.database('tonytectosDB');

    // // Get the container object
    // const container=db.container('tonytectosContainer');

    // // preparing the query
    // const querySpec = {
    //     query: 'SELECT * FROM items'
    // };

    // // Get items
    // const { resources } = await container.items.query(querySpec).fetchAll();

    // // Print headings
    // console.log(`\nId \t Nome`);

    // // show the results
    // for (const item of resources) {
    //     console.log(`${item.id} \t ${item.artigos}`);
    // }

//termina filtros

var express = require('express')

var app = express()
const port = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port ${port}!');
});
