import express from 'express';
import mustacheExpress from 'mustache-express';
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//MIDDLEWARE
import parseCookieMiddleware from './middlewares/parseCookieMiddleware';
import validadteAuthTokenMiddleware from './middlewares/validateAuthTokenMiddleware';

//ROUTES
import generalRoutes from './routes/generalRoutes.js';
import sealRoutes from './/routes/sealRoutes.js';
import userRoutes from './/routes/userRoutes.js';
import templateRoutes from './/routes/templateRoutes.js';

app.use(parseCookieMiddleware)

app.use(userRoutes);
app.use(express.json())
app.use(validadteAuthTokenMiddleware)
app.use(sealRoutes);
app.use(templateRoutes);
app.use(generalRoutes);

const port = process.env.SERVICE_PORT || 9953;
app.listen(port, () => console.log(`HTML server listening on port ${port}`));