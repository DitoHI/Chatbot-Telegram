import db from '../../db';

const firebase = db.firebaseGetDb();

export default {
  add: (reference: string, key: string, value: string) => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(reference);
      const sitesRef = ref.child(key);

      sitesRef
        .push()
        .set(value)
        .then(() =>
          resolve(
            'Success bookmarked. Check out the bookmarks to see the results'
          )
        )
        .catch((err: any) => reject('Failed in saving to firebase'));
    });
  },
  checkIfExist: (reference: string, key: string, value: string) => {
    return new Promise((resolve, reject) => {
      return firebase
        .database()
        .ref(`${reference}/${key}`)
        .on('value', snapshot => {
          const values = Object.values(snapshot.val());
          const isExist = values.indexOf(value) > -1;
          if (isExist) {
            return reject('Already bookmarked');
          }
          return resolve('Safe');
        });
    });
  },
  read: (reference: string, key: string) => {
    return new Promise((resolve, reject) => {
      return firebase
        .database()
        .ref(`${reference}/${key}`)
        .on('value', snapshot => {
          const values = Object.values(snapshot.val());
          if (values.length === 0) {
            return reject('No bookmark');
          }
          return resolve(values);
        });
    });
  },
  addEmailToUser: (id: string, email: string) => {
    return new Promise((resolve, reject) => {
      const siteRef = firebase.database().ref('users');

      return siteRef
        .child(id)
        .child('email')
        .set(email)
        .then(() => resolve('Saved email'))
        .catch((err: any) => reject('Failed in saving email to firebase'));
    });
  },
  addGiftToUser: (id: string, gift: string) => {
    return new Promise((resolve, reject) => {
      const siteRef = firebase.database().ref('gift');

      return siteRef
        .child(id)
        .set(gift)
        .then(() => resolve(gift))
        .catch(err => reject('Failed in saving gift to firebase'));
    });
  }
};
