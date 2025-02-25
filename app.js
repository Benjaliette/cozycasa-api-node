const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

const swaggerSpec = require('./swagger');

const users = require('./routes/users');
const todos = require('./routes/todos');
const events = require('./routes/events');
const homes = require('./routes/homes');
const notes = require('./routes/notes');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

corsConfig = {
  origin: process.env.FRONT_URL,
  credentials: true
}

app.use(cors(corsConfig));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/v1/users', users);
app.use('/api/v1/homes', homes);
app.use('/api/v1/homes/:homeId/notes', notes);
app.use('/api/v1/homes/:homeId/todos', todos);
app.use('/api/v1/homes/:homeId/events', events);

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = process.env.MONGODB_URL;

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = app;
