let server = require('./backend/server');

// All set, start listening!
const port = 3000;
server.listen(port);
console.log("Server listening at port: " + port);