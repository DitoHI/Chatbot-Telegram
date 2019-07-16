import location from './location';
import firebase from '../firebase';

const userRef = 'users';

export default {
  init: async (displayName: string, additional?: any) => {
    let additionalObj: any = {};
    if (displayName.includes('location')) {
      additionalObj.reply_markup = {
        inline_keyboard: [
          [
            {
              text: 'Mosque',
              callback_data: 'mosque'
            },
            {
              text: 'Restaurant',
              callback_data: 'restaurant'
            },
            {
              text: 'School',
              callback_data: 'school'
            }
          ]
        ]
      };
    }

    if (displayName.includes('fetchLocation')) {
      const locations = await location.near(additional);

      additionalObj.reply_markup = {
        inline_keyboard: [locations]
      };
      additionalObj.parse_mode = 'HTML';
    }

    if (displayName.includes('bookmark')) {
      let bookmarks: any;
      try {
        bookmarks = await firebase.read(userRef, additional);
      } catch (error) {
        bookmarks = error;
      }
      let bookmarksUl: string = '';
      let index = 1;
      for (const bookmark of bookmarks) {
        bookmarksUl += `<pre>(${index}) ${bookmark} </pre>`;
        index = index + 1;
      }
      additionalObj = bookmarksUl;
    }

    if (displayName.includes('cmd')) {
      additionalObj = `<pre>(1) I want to find some location </pre><pre>(2) I want to see the bookmarks</pre>`;
    }

    return additionalObj;
  }
};
