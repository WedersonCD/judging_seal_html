const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

//middleware
const parseCookieMiddleware = require(__dirname+'/src/middleware/parseCookieMiddleware')

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/src/views');

app.use(parseCookieMiddleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//ROUTES
var router = require(__dirname+'/src/routes/index');

app.use('/', router);

const port = process.env.SERVICE_PORT || 9953
app.listen(port, () => console.log(`HTML server listening on port ${port}`));