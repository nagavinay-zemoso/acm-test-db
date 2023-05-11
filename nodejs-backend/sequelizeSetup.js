require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const { Sequelize } = require("sequelize");
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Sequelize initialization
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Define a model
const CONTACTS = sequelize.define(
  "contacts",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // disable timestamps
  }
);

// Define a route to retrieve all contacts
app.get("/contacts", async (req, res) => {
  const contacts = await CONTACTS.findAll();
  res.json(contacts);
});

// Define a route to create a new contacts
app.post("/contacts", async (req, res) => {
  try {
    const { name, age } = req.body;
    const contact = await CONTACTS.create({ name, age });
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
