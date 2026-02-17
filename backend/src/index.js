
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const sqlRoutes = require('./routes/sql');
const pexelsRoutes = require('./routes/pexels');

const openaiRoutes = require('./routes/openai');



const usersRoutes = require('./routes/users');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const franchisesRoutes = require('./routes/franchises');

const titlesRoutes = require('./routes/titles');

const seasonsRoutes = require('./routes/seasons');

const episodesRoutes = require('./routes/episodes');

const watch_entriesRoutes = require('./routes/watch_entries');

const watchlist_itemsRoutes = require('./routes/watchlist_items');

const tagsRoutes = require('./routes/tags');

const title_tagsRoutes = require('./routes/title_tags');

const attachmentsRoutes = require('./routes/attachments');


const getBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

const options = {
  definition: {
    openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Movie & Series Tracking CRM",
        description: "Movie & Series Tracking CRM Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.",
      },
    servers: [
      {
        url: getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || config.swaggerUrl,
        description: "Development server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', function (req, res, next) {
    swaggerUI.host = getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || req.get('host');
    next()
  }, swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors({origin: true}));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');


app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRoutes);

app.use('/api/roles', passport.authenticate('jwt', {session: false}), rolesRoutes);

app.use('/api/permissions', passport.authenticate('jwt', {session: false}), permissionsRoutes);

app.use('/api/franchises', passport.authenticate('jwt', {session: false}), franchisesRoutes);

app.use('/api/titles', passport.authenticate('jwt', {session: false}), titlesRoutes);

app.use('/api/seasons', passport.authenticate('jwt', {session: false}), seasonsRoutes);

app.use('/api/episodes', passport.authenticate('jwt', {session: false}), episodesRoutes);

app.use('/api/watch_entries', passport.authenticate('jwt', {session: false}), watch_entriesRoutes);

app.use('/api/watchlist_items', passport.authenticate('jwt', {session: false}), watchlist_itemsRoutes);

app.use('/api/tags', passport.authenticate('jwt', {session: false}), tagsRoutes);

app.use('/api/title_tags', passport.authenticate('jwt', {session: false}), title_tagsRoutes);

app.use('/api/attachments', passport.authenticate('jwt', {session: false}), attachmentsRoutes);

app.use(
    '/api/openai',
    passport.authenticate('jwt', { session: false }),
    openaiRoutes,
);
app.use(
    '/api/ai',
    passport.authenticate('jwt', { session: false }),
    openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes);
app.use(
  '/api/sql',
  passport.authenticate('jwt', { session: false }),
  sqlRoutes);

  
const publicDir = path.join(
  __dirname,
  '../public',
);

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function(request, response) {
    response.sendFile(
      path.resolve(publicDir, 'index.html'),
    );
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
