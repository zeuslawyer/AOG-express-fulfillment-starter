const {
  dialogflow,
  Permission,
  Suggestions,
  BasicCard,
  Carousel,
  Image
} = require('actions-on-google');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// ... app code here

// Handle the Dialogflow intent named 'Default Welcome Intent'. Not fulfilled on Dialogflow, but here, as Permission needed.
app.intent('Default Welcome Intent', conv => {
  /* NOTE: 
      persistent storage object is conv.user.storage
      session storage object is conv.data
  */
  const name = conv.user.storage.userName;
  if (!name) {
    // Asks the user's permission to know their name, for personalization.
    // console.log(" ***** no stored name....***");
    conv.ask(
      new Permission({
        context: 'Hi there, to get to know you better',
        permissions: 'NAME'
      })
    );
  } else {
    // console.log(`*****  stored name.... is ${name}*** `);
    conv.ask(`Hi again, ${name}. Welcome to this App!`);
  }
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries at all. How are you today?`);
  } else {
    //assign name as granted to PERSISTENT data object which is prop of conv object
    conv.user.storage.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.user.storage.userName}. So, How are you today?`);
  }
});

// NO INPUT EVENT FOR CHOICE OF LOCAL OR INTERNATIONAL
// app.intent("DYNAMIC_REPROMPT_DESTINATION_CHOICE", (conv, storage, context) => {
app.intent('no_input', (conv, storage, context) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  const name = conv.user.storage.userName;
  if (repromptCount === 0) {
    conv.ask(`Hey, ${name}Is that going to be an international or local text?`);
  } else {
    conv.ask(
      `Hi ${name}. Do you want to send the text to an international or local destination`
    );
  }
});

module.exports = app;
