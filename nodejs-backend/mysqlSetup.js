const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "acm-test-db",
  password: "acm-test-db",
  database: "contacts_db",
});

connection.connect();

app.get("/contacts", (req, res) => {
  connection.query("SELECT * FROM contacts", (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(results);
    }
  });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
