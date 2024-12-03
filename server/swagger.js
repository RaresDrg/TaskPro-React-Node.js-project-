import swaggerJsdoc from "swagger-jsdoc";
import utils from "./utils/utils.js";

const iconsOptions = utils.handleBoardsSchema("icon");
const bgOptions = utils.handleBoardsSchema("background");
const priorityOptions = utils.handleBoardsSchema("priority");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskPro API",
      version: "1.0.0",
      description:
        "<hr></hr><strong>TaskPro</strong> is an intuitive Kanban board application designed to help users organize and manage their projects and tasks efficiently. Inspired by tools like Trello or Jira, it offers a seamless experience for tracking progress and staying productive. Key features include user authentication, project management, column management, and detailed cards with options for task name, description, priority, and deadline. <br></br> <strong>Base URL</strong> => https://taskproserver.vercel.app",
      contact: {
        name: "Rares Dragan",
        url: "https://github.com/RaresDrg",
      },
    },
    servers: [
      { url: "https://taskproserver.vercel.app", description: "Base URL" },
    ],
    tags: [
      { name: "Users" },
      { name: "Boards" },
      { name: "Columns" },
      { name: "Cards" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the user",
              minLength: 3,
              maxLength: 50,
              example: "John Doe",
            },
            email: {
              type: "string",
              description: "A valid email address",
              format: "email",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description:
                "The password must be at least 8 characters, including at least one uppercase, one lowercase, and one digit.",
              minLength: 8,
              pattern: "^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}$",
              example: "Password123",
            },
            profilePhoto: {
              typs: "string",
              description: " User's profile photo (optional)",
              format: "binary",
            },
            theme: {
              type: "string",
              description: "User's theme preference",
              enum: ["light", "dark", "violet"],
              example: "light",
            },
          },
          required: ["name", "email", "password"],
        },
        Board: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the board",
              minLength: 3,
              maxLength: 50,
              example: "Project One",
            },
            icon: {
              type: "string",
              description: "The icon of the board",
              enum: iconsOptions,
              example: "icon-project",
            },
            background: {
              type: "string",
              description: "The background of the board",
              enum: bgOptions,
              example: "bg-1",
            },
          },
          required: ["title", "icon", "background"],
        },
        Column: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the column",
              minLength: 3,
              maxLength: 50,
              example: "Column X",
            },
          },
          required: ["title"],
        },
        Card: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the card",
              minLength: 3,
              maxLength: 50,
              example: "Card One",
            },
            description: {
              type: "string",
              description: "The description of the card",
              minLength: 5,
              maxLength: 400,
              example: "This is card one.",
            },
            priority: {
              type: "string",
              description: "The priority of the card",
              enum: priorityOptions,
              example: "medium",
            },
            deadline: {
              type: "string",
              description:
                "The deadline of the card. It should be a date that is greater than or equal to today's date.",
              example: "Dec 25 2024",
            },
          },
          required: ["title", "description", "priority", "deadline"],
        },
      },
    },
  },
  apis: ["./routes/swaggerDocs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
