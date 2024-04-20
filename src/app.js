const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//MIDDLEWARE
const parseCookieMiddleware = require(__dirname+'/middlewares/parseCookieMiddleware');
const validadteAuthTokenMiddleware = require(__dirname+'/middlewares/validateAuthTokenMiddleware');

//ROUTES
const generalRoutes = require(__dirname+'/routes/generalRoutes');
const sealRoutes = require(__dirname+'/routes/sealRoutes');
const userRoutes = require(__dirname+'/routes/userRoutes');
const templateRoutes = require(__dirname+'/routes/templateRoutes');

app.use(parseCookieMiddleware)

app.use(userRoutes);
app.use(express.json())
app.use(validadteAuthTokenMiddleware)
app.use(sealRoutes);
app.use(templateRoutes);
app.use(generalRoutes);

const port = process.env.SERVICE_PORT || 9953;
app.listen(port, () => console.log(`HTML server listening on port ${port}`));