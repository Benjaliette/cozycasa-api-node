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
      "name": "Users",
      "description": "Users authentication and registration"
    },
    {
      "name": "Homes",
      "description": "CRUD for homes"
    },
    {
      "name": "Notes",
      "description": "CRUD for home notes"
    },
    {
      "name": "Todos",
      "description": "CRUD for home todo list"
    },
    {
      "name": "Events",
      "description": "CRUD for home events"
    },
  ],
  "paths": {
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
                  "type": "object",
                  "properties": {
                    "accessToken": {
                      "type": "string",
                      "example": "accessToken1234"
                    },
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accessToken": {
                      "type": "string",
                      "example": "accessToken1234"
                    },
                    "user": {
                      "type": "object",
                      "$ref": "#/components/schemas/User"
                    }
                  }
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
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Logged out"
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Logged out"
                    }
                  }
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
        "responses": {
          "200": {
            "description": "successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accessToken": {
                      "type": "string",
                      "example": "accessToken1234"
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "accessToken": {
                      "type": "string",
                      "example": "accessToken1234"
                    }
                  }
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
    },
    "/homes": {
      "get": {
        "tags": [
          "Homes"
        ],
        "summary": "Get all homes",
        "description": "Get all homes for authenticated user",
        "operationId": "home_list",
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Home List"
                    },
                    "homes": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Home"
                      }
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Home List"
                    },
                    "homes": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Home"
                      }
                    }
                  }
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
          "Homes"
        ],
        "summary": "Add a new home",
        "description": "Add a new home to user",
        "operationId": "home_create",
        "requestBody": {
          "description": "Create a home",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Home"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Home"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Home"
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
                  "$ref": "#/components/schemas/Home"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Home"
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
    "/homes/{id}": {
      "put": {
        "tags": [
          "Homes"
        ],
        "summary": "Update a home",
        "description": "Update a user home",
        "operationId": "home_update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the home to update",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Update a home",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Home"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Home"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Home"
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
                  "$ref": "#/components/schemas/Home"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Home"
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
      "delete": {
        "tags": [
          "Homes"
        ],
        "summary": "Delete a home",
        "description": "Delete a user home",
        "operationId": "home_delete",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of the home to update",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "description": "ID of the deleted home",
                  "example": "id29of65home34"
                }
              },
              "application/xml": {
                "schema": {
                  "type": "string",
                  "description": "ID of the deleted home",
                  "example": "id29of65home34"
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
    "/homes/{homeId}/events": {
      "get": {
        "tags": [
          "Events"
        ],
        "summary": "Get all events",
        "description": "Get all events for authenticated user selected home",
        "operationId": "event_list",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Event List"
                    },
                    "events": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Event"
                      }
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Event List"
                    },
                    "events": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Event"
                      }
                    }
                  }
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
          "Events"
        ],
        "summary": "Create an event",
        "description": "Create an event for a user in a home",
        "operationId": "event_create",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Create an event",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Event"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Event"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Event"
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
                  "$ref": "#/components/schemas/Event"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Event"
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
      }
    },
    "/homes/{homeId}/events/{id}": {
      "put": {
        "tags": [
          "Events"
        ],
        "summary": "Update an event",
        "description": "Update the event for the given id",
        "operationId": "event_update",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "ID of the event",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Update an event",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Event"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Event"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Event"
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
                  "$ref": "#/components/schemas/Event"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Event"
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
      "delete": {
        "tags": [
          "Events"
        ],
        "summary": "Delete event",
        "description": "Delete the event with the given id",
        "operationId": "event_delete",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "ID of the event to delete",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "idofthedeletedevent1234"
                }
              },
              "application/xml": {
                "schema": {
                  "type": "string",
                  "example": "idofthedeletedevent1234"
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
    },
    "/homes/{homeId}/notes": {
      "get": {
        "tags": [
          "Notes"
        ],
        "summary": "Get all notes",
        "description": "Get all notes for authenticated user",
        "operationId": "note_list",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Note List"
                    },
                    "notes": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Note"
                      }
                    }
                  }
                }
              },
              "application/xml": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Note List"
                    },
                    "events": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Note"
                      }
                    }
                  }
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
          "Notes"
        ],
        "summary": "Create a note",
        "description": "Create a note for a user in a home",
        "operationId": "note_create",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Create a note",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Note"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Note"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Note"
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
                  "$ref": "#/components/schemas/Note"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Note"
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
      }
    },
    "/homes/{homeId}/notes/{id}": {
      "put": {
        "tags": [
          "Notes"
        ],
        "summary": "Update a note",
        "description": "Update the note for the given id",
        "operationId": "note_update",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "ID of the note to update",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Update a note",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Note"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Note"
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "$ref": "#/components/schemas/Note"
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
                  "$ref": "#/components/schemas/Note"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Note"
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
      "delete": {
        "tags": [
          "Notes"
        ],
        "summary": "Delete note",
        "description": "Delete the note with the given id",
        "operationId": "note_delete",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the note home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "in": "path",
            "description": "ID of the note to update",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "example": "idofthedeletednote1234"
                }
              },
              "application/xml": {
                "schema": {
                  "type": "string",
                  "example": "idofthedeletednote1234"
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
    },
    "/homes/{homeId}/todos": {
      "get": {
        "tags": [
          "Todos"
        ],
        "summary": "Get all todos",
        "description": "Get all todos for authenticated user",
        "operationId": "todo_list",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Todo List"
                    },
                    "todos": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Todo"
                      }
                    }
                  }
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
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          }
        ],
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
    "/homes/{homeId}/todos/{id}": {
      "put": {
        "tags": [
          "Todos"
        ],
        "summary": "Update a task in user todo list",
        "description": "Update a task in user todo list",
        "operationId": "todo_update",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the task's home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
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
      },
      "delete": {
        "tags": [
          "Todos"
        ],
        "summary": "Delete a task from user todo list",
        "description": "Update a task from user todo list",
        "operationId": "todo_delete",
        "parameters": [
          {
            "name": "homeId",
            "in": "path",
            "description": "ID of the event home",
            "required": "true",
            "schema": {
              "type": "string"
            }
          },
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
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "description": "ID of the deleted task",
                  "example": "id29of65todo34"
                }
              },
              "application/xml": {
                "schema": {
                  "type": "string",
                  "description": "ID of the deleted task",
                  "example": "id29of65todo34"
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
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "id29of65todo34"
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
      "Home": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "id29of65home34"
          },
          "name": {
            "type": "string",
            "example": "Home sweet home"
          },
          "key": {
            "type": "string",
            "example": "keytoenterhome"
          }
        },
        "xml": {
          "name": "todo"
        }
      },
      "Todo": {
        "required": [
          "title"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "id29of65todo34"
          },
          "title": {
            "type": "string",
            "example": "Do the laundry"
          },
          "completed": {
            "type": "boolean",
            "example": false
          }
        },
        "xml": {
          "name": "todo"
        }
      },
      "Note": {
        "required": [
          "title"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "id29of65note34"
          },
          "title": {
            "type": "string",
            "example": "Note to remember"
          },
          "content": {
            "type": "string",
            "example": "Details of what I need to remember"
          }
        },
        "xml": {
          "name": "todo"
        }
      },
      "Event": {
        "required": [
          "start_date",
          "end_date",
          "title"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "id29of65todo34"
          },
          "start_date": {
            "type": "string",
            "example": "24/07/2024"
          },
          "end_date": {
            "type": "string",
            "example": "24/07/2024"
          },
          "title": {
            "type": "string",
            "example": "Note for later"
          },
          "content": {
            "type": "string",
            "example": "Some notes wrote to remember things"
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
