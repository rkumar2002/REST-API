const http = require("http");
const app = require('./app')
const server = http.createServer(app);

server.listen(3000, console.log("WORKING"));

// To start server - node server.js
// But to avoid starting the server again and again use - nodemon server.js