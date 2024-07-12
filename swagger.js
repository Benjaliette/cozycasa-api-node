const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
  title: 'CozyCasa API v1',
  version: '1.0.0',
  description: 'CozyCasa API documentation',
  },
};

const options = {
  swaggerDefinition,
  apis: ['routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
