


const os = require('os');

const config = {
  gcloud: {
    bucket: "fldemo-files",
    hash: "afeefb9d49f5b7977577876b99532ac7"
  },
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "7118ea9a",
  user_pass: "70a68a0c4d00",
  admin_email: "admin@flatlogic.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: process.env.SECRET_KEY || '7118ea9a-6bb7-4475-a572-70a68a0c4d00',
  remote: '',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",

  portUIProd: process.env.NODE_ENV === "production" ? "" : ":3000",

  swaggerUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  swaggerPort: process.env.NODE_ENV === "production" ? "" : ":8080",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  microsoft: {
      clientId: process.env.MS_CLIENT_ID || '',
      clientSecret: process.env.MS_CLIENT_SECRET || '',
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'Movie & Series Tracking CRM <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  roles: {

    admin: 'Administrator',


  
  user: 'Viewer',

  },

  project_uuid: '7118ea9a-6bb7-4475-a572-70a68a0c4d00',
  flHost: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev_stage' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',


  gpt_key: process.env.GPT_KEY || '',
};

config.pexelsKey = process.env.PEXELS_KEY || '';

config.pexelsQuery = 'City skyline at night';
config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
