const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

const swaggerSpec = require('./swagger');

const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/v1/users', users);
app.use('/api/v1/todos', todos);

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB =
  "mongodb+srv://benjadev:hKtWxpGR65mzBapN@cluster0.rwwfkbi.mongodb.net/cozycasadb?retryWrites=true&w=majority&appName=Cluster0"
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = app;
