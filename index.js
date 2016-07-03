// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

//For logging
var logger = require('parse-server/lib/Adapters/Logger/FileLoggerAdapter').FileLoggerAdapter;
var databaseUri = 'mongodb://JustinDMoore:Ju$tin!1@ds011345-a0.mlab.com:11345,ds011345-a1.mlab.com:11345/corpsboard?replicaSet=rs-ds011345';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'wx8eMIWy1f9e60WrQJYUI81jlk5g6YYAPPmwxequ',
  masterKey: process.env.MASTER_KEY || 'ghQaWz8I6ufa4jd5ZEN3W6kTAOXMSBCt6r9k7gKt', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://corpsboard.herokuapp.com/parse',  // Don't forget to change to https if needed
  fileKey: '57edad47-342b-49b5-97c5-bd384b2b8c46',
  FACEBOOK_APP_ID: '266535450217937',
  push: {
        ios: [
      {
        pfx: 'Push/CorpsboardPushDevelopmentCertificate.p12', // Dev P12
        bundleId: 'com.justin.corpboard',
        production: false // Dev
      },
      {
        pfx: 'Push/CorpsboardPushProductionCertificate.p12', // Prod P12
        bundleId: 'com.justin.corpboard',
        production: true // Prod
      }
    ]
  },
  liveQuery: {
    classNames: ["Rooms", "Messages"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Corpsboard-Server running.');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('Corpsboard-Server running on port ' + port + '.');
});

//To enable logs on the dashboard
process.env.VERBOSE=true;

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
