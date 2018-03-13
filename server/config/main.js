// var env = require('dotenv').load();
// console.log(process.env.NODE_ENV);
// console.log(process.env);
const { TEST_DB_URL,
 MAILGUN_KEY,
 MAILGUN_DOMAIN,
 TENANT_ID,
 CLIENT_ID,
 CLIENT_SECRET,
 COOKIE_ENCRYPTION_KEYS,
 COSMOSDB_CONNSTR,
 COSMOSDB_DBNAME,
 JWT_SECRET,
 NODE_ENV
 } = process.env;
 // require('../../secret.env');
// console.log(process.env);
// console.log(COOKIE_ENCRYPTION_KEYS);
// console.log(typeof(COOKIE_ENCRYPTION_KEYS));

//auth settings
const creds = {
  // Required
  identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/.well-known/openid-configuration`,
  // identityMetadata: 'https://login.microsoftonline.com/<tenant_name>.onmicrosoft.com/.well-known/openid-configuration', 
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
  //
  // or you can use the common endpoint
  // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
  // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.

  // Required, the client ID of your app in AAD  
  clientID: CLIENT_ID,

  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token' 
  responseType: 'id_token code', 

  // Required
  responseMode: 'form_post', 

  // Required, the reply URL registered in AAD for your app
  //local dev
  redirectUrl: (NODE_ENV === 'dev_server') ? 
  'http://dev-vshs-portal.ad.cc-courts.org/api/auth/openid/return': 
  'http://localhost:3000/api/auth/openid/return',
  //dev server
  // redirectUrl: 'http://dev-vshs-portal.ad.cc-courts.org/api/auth/openid/return',

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: true,
  
  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'. 
  // If app key contains '\', replace it with '\\'.
  clientSecret: CLIENT_SECRET, 

  // Required to set to false if you don't want to validate issuer
  validateIssuer: true,
  
  // Required to set to true if you are using B2C endpoint
  // This sample is for v1 endpoint only, so we set it to false
  isB2C: false,

  // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
  issuer: null,

  // Required to set to true if the `verify` function has 'req' as the first parameter
  passReqToCallback: false,

  // Recommended to set to true. By default we save state in express session, if this option is set to true, then
  // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
  // to be completely express session free.
  useCookieInsteadOfSession: true,

  // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
  // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
  // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
  cookieEncryptionKeys: JSON.parse(COOKIE_ENCRYPTION_KEYS),

  // Optional. The additional scope you want besides 'openid', for example: ['email', 'profile'].
  scope: null,

  // Optional, 'error', 'warn' or 'info'
  loggingLevel: 'info',

  // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
  nonceLifetime: null,

  // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
  nonceMaxAmount: 5,

  // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
  clockSkew: null,
};

module.exports = {
  // Secret key for JWT signing and encryption
  secret: JWT_SECRET,
  // Database connection information
  // database: 'mongodb://localhost:27017',
  // test_database: TEST_DB_URL,

  //Cosmos DB Emulator
  test_database: 'mongodb://localhost:C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==@localhost:10255/admin?ssl=true',
  // test_db_url: 'https://localhost:8081',
  database: COSMOSDB_CONNSTR+COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb",
  // Setting port for server
  // port: 3000,
  // Configuring Mailgun API for sending transactional email
  // Rt now using authorized accounts only for testing -->
  mailgun_priv_key: MAILGUN_KEY,
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: MAILGUN_DOMAIN,
  // Mailchimp API key
  mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3000,
  test_db: 'mern-starter-test',
  // dev_server: 'development',
  creds: creds,

  // Optional.
// If you want to get access_token for a specific resource, you can provide the resource here; otherwise, 
// set the value to null.
// Note that in order to get access_token, the responseType must be 'code', 'code id_token' or 'id_token code'.
resourceURL: 'https://graph.windows.net',

// The url you need to go to destroy the session with AAD
destroySessionUrl: (NODE_ENV === 'dev_server') ?
'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://dev-vshs-portal.ad.cc-courts.org':
'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://localhost:3000',

// If you want to use the mongoDB session store for session middleware; otherwise we will use the default
// session store provided by express-session.
// Note that the default session store is designed for development purpose only.
useMongoDBSessionStore: true,


// How long you want to keep session in mongoDB.
mongoDBSessionMaxAge: 24 * 60 * 60,  // 1 day (unit is second)

};
