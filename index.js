'use strict';

/*
THIS VERSION CREATES AN EXPRESS APP OUT OF THE DIALOGFLOW APP FOR LOCAL SERVING
*/
const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const dialogFlowApp = require('./DialogflowApp');

const expressApp = express().use(bodyParser.json());
/*
 *  EXPRESS APP ROUTING
 */

// GET test route
expressApp.get('/fulfillment', (req, res) => {
  res.send('CONFIRMED RECEIPT OF GET');
});

//POST -> DialogFlow fulfillment route
expressApp.post('/fulfillment', dialogFlowApp);

/*
 *   LOCAL NGROK SERVER LOGIC.
 *   ENSURE that you "export DEV_MODE=true" in terminal prior to start
 */
if (process.env.DEV_MODE) {
  const PORT = 8000;
  expressApp.listen(PORT, () => {
    console.log(`*** SERVER RUNNING ON PORT ${PORT} ***`);
  });
} else {
  console.log('*** NOT A LOCAL DEV ENV - OR - LOCAL ENV VAR NOT SET  ****');
}

/**
 * EXPORT an endpoint for the EXPRESS server, when using cloud functions
 * REFERENCE:  https://developers.google.com/actions/reference/nodejsv2/overview#export_your_app
 */

exports.dialogFlowExpressServer = functions.https.onRequest(expressApp);
