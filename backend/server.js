let express    = require('express'),
    config     = require('./config'),
    api        = require('./api'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    server;

// Create the HTTP server (Express 3.0 version)
server = express();

/** Apply the configuration **/
let rootDir = path.resolve(__dirname, '..');

// parse application/json
server.use(bodyParser.json());
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended: true}));
// add cors
server.use(cors());
// Serve static content from "public" directory
server.use(express.static(rootDir + '/public'));

// Add the api routes
api.applyRoutes(server);

server.use('/public', express.static(__dirname + '/public'));

server.get('/*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

// Some initialization or whatever can go here...

// Export the server
module.exports = server;