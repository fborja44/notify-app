/* Web Server Setup requirements
------------------------------------------------------------------------------*/
const express = require("express");
const app = express();
var http = require("http");
const PORT = 3001;

const server = http.createServer(app);
const router = express.Router();
const configRoutes = require("./routes");
const cors = require("cors")

var date = new Date();

const rewriteUnsupportedBrowserMethods = (req: any, res: any, next: any) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

/* For background operations - coloring terminal font and pathing for outside
   resources
   ---------------------------------------------------------------------------*/
const path = require("path");
let bodyParser = require("body-parser");
const chalk = require("chalk");

const mongoCollections = require("./config/mongoCollections.ts");
const dbConnection = require("./config/mongoConnection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

configRoutes(app);

server.listen(PORT);

/* Initial console setup [header] 
------------------------------------------------------------------------------*/
console.log(chalk.bold.cyan("--------- Denote --------- "));
console.log(chalk.bold.cyan(` Created by Francis Borja `));
console.log(chalk.gray(`Server running at port ${PORT}`));
console.log(chalk.gray("---------------------------"));
