import { default as TelegramBot } from 'node-telegram-bot-api';
import { default as nodeEmoji } from 'node-emoji';

import { IFullfillmentMessage } from '../publicInterface';

require('dotenv').config();

// custom func
import dialogflow from './dialogflow';
import intent from './dialogflow/intent';
import queries from './dialogflow/queries';
import location from './dialogflow/location';
import firebase from './firebase';
import utils from '../../utils';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const userRef = 'users';

bot.on('message', msg => {
  const response = dialogflow
    .runSample(msg.text, msg.from.id.toString(10))
    .then((response: IFullfillmentMessage) => {
      bot
        .sendMessage(msg.chat.id, response.text, response.content)
        .then()
        .catch(() => {
          return new Error('Telegram Bot Failing');
        });
      if (response.sticker == true) {
        const stickerChosen =
          queries.birthdayStickers[
            utils.getRandomInt(0, queries.birthdayStickers.length - 1)
          ];
        bot
          .sendSticker(msg.chat.id, stickerChosen)
          .then()
          .catch();
      }
    })
    .catch((err: string) => {
      bot
        .sendMessage(msg.chat.id, err)
        .then()
        .catch(() => {
          return new Error('Telegram Bot Failing');
        });
    });
});

bot.on('callback_query', async callbackQuery => {
  const data: any = callbackQuery.data;
  let result: IFullfillmentMessage;

  // v2
  // Birthday
  if (queries.gift.includes(data)) {
    return firebase
      .addGiftToUser(callbackQuery.from.id.toString(10), data)
      .then(() => {
        bot
          .sendMessage(
            callbackQuery.from.id,
            `Your ${nodeEmoji.emoji.kiss} gift is coming soon. Build with ${nodeEmoji.emoji.hearts}`
          )
          .then()
          .catch();
      })
      .catch((message: string) => {
        // data already exist
        bot
          .sendMessage(callbackQuery.from.id, message)
          .then()
          .catch(() => {
            return new Error('Telegram Bot Failing');
          });
      });
  }

  if (queries.common.includes(data)) {
    result = {
      text: `<i>Choose ${data} ${await location.current()}</i>`,
      content: await intent.init('fetchLocation', data)
    };

    await bot.sendMessage(callbackQuery.from.id, result.text, result.content);
  } else {
    // check if value exist
    // before bookmark
    firebase
      .checkIfExist(userRef, callbackQuery.from.id.toString(10), data)
      .then(async () => {
        try {
          const saved = await firebase.add(
            userRef,
            callbackQuery.from.id.toString(10),
            data
          );
          bot
            .sendMessage(
              callbackQuery.from.id,
              `${saved.toString()}. Search again to bookmark`
            )
            .then()
            .catch(() => {
              return new Error('Telegram Bot Failing');
            });
        } catch (err) {
          bot
            .sendMessage(
              callbackQuery.from.id,
              `${err}. Search again to bookmark`
            )
            .then()
            .catch(() => {
              return new Error('Telegram Bot Failing');
            });
        }
      })
      .catch((message: string) => {
        // data already exist
        bot
          .sendMessage(callbackQuery.from.id, message)
          .then()
          .catch(() => {
            return new Error('Telegram Bot Failing');
          });
      });
  }
});
