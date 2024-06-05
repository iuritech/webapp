// // index.js
// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 8080;

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

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

