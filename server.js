const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./API/api');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/api', api);

// Define PORT
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Connected to port ' + port);
});