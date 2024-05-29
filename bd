const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
});

const database = client.database(process.env.COSMOS_DB_DATABASE);
const container = database.container(process.env.COSMOS_DB_CONTAINER);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const { resources: items } = await container.items.query('SELECT * from c').fetchAll();
        res.render('index', { items });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error connecting to Cosmos DB");
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

