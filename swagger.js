const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  "openapi": "3.0.3",
  "info": {
    "title": "CozyCasa - OpenAPI 3.0",
    "description": "This is the documentation of the CozyCasa API based on the OpenAPI 3.0 specification.\n\nGithub repository:\n- [The CozyCasa API repository](https://github.com/Benjaliette/cozycasa-api-node)",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "email": "benjamin.liet.dev@gmail.com"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:3000/api/v1"
    }
  ],
  "tags": [
    {
      "name": "Todos",
      "description": "CRUD for todo list"
    },
    {
      "name": "Users",
      "description": "Users authentication and registration"
    }
  ],
  "paths": {
    "/todos": {
      "get": {
        "tags": [
          "Todos"
        ],
        "summary": "Get all todos",
        "description": "Get all todos for authenticated user",
        "operationId": "todo_list",
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Pet not found"
          },
          "422": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
      "post": {
        "tags": [
          "Todos"
        ],
        "summary": "Add a new task in user todo list",
        "description": "Add a new task in user todo list",
        "operationId": "todo_create",
        "requestBody": {
          "description": "Create a todo",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "422": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
    },
    "/todos/{id}": {
      "put": {
        "tags": [
          "Todos"
        ],
        "summary": "Update a task in user todo list",
        "description": "Update a task in user todo list",
        "operationId": "todo_update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the task to update",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Update a todo",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Todo"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Todo"
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "422": {
            "description": "Validation exception"
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/users/signup": {
      "post": {
        "tags": [
          "Users"
        ],
        "summary": "Create user",
        "description": "Registration of a new user.",
        "operationId": "user_create",
        "requestBody": {
          "description": "Create user object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    },
    "/users/login": {
      "post": {
        "tags": [
          "Users"
        ],
        "summary": "Login of a registrated user",
        "description": "Create JWT tokens to log user",
        "operationId": "user_login",
        "requestBody": {
          "description": "Tokens for login",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Identifier"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Token"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Token"
                }
              }
            }
          },
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/users/logout": {
      "delete": {
        "tags": [
          "Users"
        ],
        "summary": "Logs out current logged in user session",
        "description": "",
        "operationId": "user_logout",
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "default": {
            "description": "successful operation"
          }
        }
      }
    },
    "/users/refreshToken": {
      "post": {
        "tags": [
          "Users"
        ],
        "summary": "Get new access token",
        "description": "",
        "operationId": "refresh_token",
        "requestBody": {
          "description": "Tokens for login",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Token"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Token"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Token"
                }
              }
            }
          },
          "400": {
            "description": "Invalid username supplied"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "example": 10
          },
          "username": {
            "type": "string",
            "example": "theUser"
          },
          "email": {
            "type": "string",
            "example": "john@email.com"
          },
          "password": {
            "type": "string",
            "example": "123456"
          }
        },
        "xml": {
          "name": "user"
        }
      },
      "Identifier": {
        "type": "object",
        "properties": {
          "identifier": {
            "type": "string",
            "description": "username or email",
            "example": "theUser"
          },
          "password": {
            "type": "string",
            "example": "123456"
          }
        },
        "xml": {
          "name": "identifier"
        }
      },
      "Token": {
        "type": "object",
        "properties": {
          "accessToken": {
            "type": "string",
            "example": "accesstokenhashed1234"
          },
          "refreshToken": {
            "type": "string",
            "example": "refreshtokenhashed1234"
          }
        },
        "xml": {
          "name": "token"
        }
      },
      "Todo": {
        "required": [
          "title",
          "completed",
          "user"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "example": 10
          },
          "title": {
            "type": "string",
            "example": "Do the laundry"
          },
          "completed": {
            "type": "boolean",
            "example": false
          },
          "userId": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date",
            "example": "2024-07-12T16:20:48.795Z"
          }
        },
        "xml": {
          "name": "todo"
        }
      }
    },
    "requestBodies": {
      "Todo": {
        "description": "Todo object that needs to be added to the todolist",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/Todo"
            }
          },
          "application/xml": {
            "schema": {
              "$ref": "#/components/schemas/Todo"
            }
          }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
