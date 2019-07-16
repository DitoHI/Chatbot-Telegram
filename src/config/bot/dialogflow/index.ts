import dialogflow from 'dialogflow';
import { default as nodeEmoji } from 'node-emoji';
import { default as uuidv4 } from 'uuid/v4';
import { IFullfillmentMessage } from '../../publicInterface';
import birthday from './birthday';
import intent from './intent';
import utils from '../../../utils';
import queries from './queries';

require('dotenv').config();

let resultObj: IFullfillmentMessage = {};

export default {
  runSample: (
    text: string,
    userKey: string = null,
    projectId = process.env.GOOGLE_PROJECT_ID
  ) => {
    return new Promise(async (resolve, reject) => {
      const sessionId = uuidv4();

      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text,
            // The language used by the client (en-US)
            languageCode: 'en-US'
          }
        }
      };

      // Send request and log result
      try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        let fulfillmentText = result.fulfillmentText;
        const displayName = result.intent.displayName;

        resultObj.text = fulfillmentText;
        resultObj.content = await intent.init(displayName, userKey);

        // html parse
        if (displayName.includes('location')) {
          fulfillmentText = `<i>${fulfillmentText}</i>`;
          resultObj.text = fulfillmentText;
        }
        if (displayName.includes('bookmark') || displayName.includes('cmd')) {
          resultObj.text = `<i>${fulfillmentText}</i>: ${resultObj.content}`;
          resultObj.content = {};
        }

        // v2
        // Birthday Bot
        if (displayName.toLowerCase().includes('gift')) {
          resultObj.text = `${fulfillmentText} ${nodeEmoji.emoji.blush}`;
        }

        if (displayName.toLowerCase().includes('email')) {
          resultObj = birthday.init(
            userKey,
            result.parameters.fields.email.stringValue,
            fulfillmentText
          );
        }

        // Send sticker
        if (displayName.toLowerCase().includes('birthday')) {
          const listRandomEmoji = [
            nodeEmoji.emoji.blush,
            nodeEmoji.emoji.heart_eyes,
            nodeEmoji.emoji.kissing_heart
          ];

          const randomId = utils.getRandomInt(0, listRandomEmoji.length - 1);
          const randomEmoji = listRandomEmoji[randomId];
          const randomQuote = queries.birthdayQuotes[randomId];

          resultObj.text = `${fulfillmentText} ${randomEmoji} <b>${randomQuote}</b>`;
          resultObj.sticker = true;
        }

        resultObj.content.parse_mode = 'HTML';
        return resolve(resultObj);
      } catch (error) {
        // return failed
        return reject('Our bot is error :(');
      }
    });
  }
};
