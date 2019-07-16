import { throws } from 'assert';
import { default as nodeEmoji } from 'node-emoji';
import { IFullfillmentMessage } from '../../publicInterface';

import firebase from '../firebase';

export default {
  init: (idUser: string, email: string, fulfillmentText: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = re.test(email);

    let resultObj: IFullfillmentMessage = {};
    resultObj.content = {};
    if (isValidEmail) {
      // insert email to firebase
      firebase
        .addEmailToUser(idUser, email)
        .then()
        .catch();

      resultObj.text = `${fulfillmentText} ${nodeEmoji.emoji.nerd_face}`;
      resultObj.content.reply_markup = {
        inline_keyboard: [
          [
            {
              text: `Ring ${nodeEmoji.emoji.ring}`,
              callback_data: 'ring'
            },
            {
              text: `Bracelet ${nodeEmoji.emoji.information_desk_person}`,
              callback_data: 'bracelet'
            },
            {
              text: `Pouch ${nodeEmoji.emoji.pouch}`,
              callback_data: 'pouch'
            }
          ]
        ]
      };
    } else {
      resultObj.text = `Looks like the email is not valid. Try again ${nodeEmoji.emoji.crying_cat_face}`;
    }
    return resultObj;
  }
};
