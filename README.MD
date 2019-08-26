# REFERENCES:

[exress apps for dialogflow fulfillment](https://developers.google.com/actions/reference/nodejsv2/overview#export_your_app)
[using NGROK to locally host your fulfillment for fast dev](https://www.freecodecamp.org/news/how-to-implement-local-fulfillment-for-google-assistant-actions-using-dialogflow-1b3b3a13075f/)
[Firebase Tools CLI ref](https://firebase.google.com/docs/cli#initialize_a_firebase_project)

### Running the Server and using NGROK

- export a local env variable : see line 26 of `index.js`
- open two terminal windows. In one run `[npm/yarn] run dev` and in the other run `[npm/yarn] run tunnel`
- use the NGROK forwarding address as the URL webhook in Dialogflow fulfillent.
