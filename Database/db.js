var mysql = require('mysql');

const config = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "ticket"
}

const prodConfig = {
    host: "sql5.freesqldatabase.com",
    user: "sql5403037",
    password: "m2BNpYQdU2",
    database: "sql5403037"
}

var connection = mysql.createConnection(prodConfig);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!");
});

module.exports = {
    connection: mysql.createConnection(prodConfig)
};