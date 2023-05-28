const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./firestore-credentials.json");
const openai = require("openai");
const openaiKey = "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";

const cors = require("cors")({origin: true});
const apiKey = "AIzaSyAoNwHNlcaeT6We2s1iEP2woEvimjguUO0";

admin.initializeApp({
  apiKey: apiKey,
  projectId: "moviechat-c0e74",
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviechat-c0e74-default-rtdb.firebaseio.com",
  storageBucket: "moviechat-c0e74.appspot.com",
  authDomain: "moviechat-c0e74.firebaseapp.com",
});

exports.returnPesticides = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const {prompt} = req.query;
    const breaks = [];

    const configuration = new openai.Configuration({
      organization: "org-igKm5c9dZfTIAxzI9wZSm2qw",
      apiKey: openaiKey,
    });

    const openaiInstance = new openai.OpenAIApi(configuration);

    breaks.push("openai initialized");

    const prompt1 = "Please return a pesticide recommendation based on this ";
    const prompt2 = "detection alert from our field camera. The alert is: ";
    const prompt3 = "Please send your recommendation back in JSON format ";
    const prompt4 = "with the following keys: pesticide and amount.";
    const prompt5 = "Pesticide should be a pesticide that best protects crops";
    const prompt6 = " from the combination of pests detected in the alert and";
    const prompt7 = "amount should be an integer representing the amount of";
    const prompt8 = " pesticide in ounces that is recommended for use.";
    const promptHelper = prompt1 + prompt2 + prompt + prompt3 + prompt4 +
    prompt5 + prompt6 + prompt7 + prompt8;
    breaks.push(promptHelper.split(" ")[0]);
    try {
      await openaiInstance.createCompletion(
          {
            model: "text-davinci-003",
            prompt: promptHelper,
            max_tokens: 1500,
            temperature: 0.1,
          },
          {
            timeout: 20000,
          },
      ).then(async (response) => {
        res.status(200).send(response.data.choices[0].text);
      });
    } catch (error) {
      if (error.response) {
        res.status(500).send([error.response, breaks]);
      } else {
        res.status(500).send([error.message, breaks]);
      }
    }
  });
});
