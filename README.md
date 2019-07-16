## Telegram Chatbot with Node.js and Dialogflow

The implementation of chatbot with [dialogflow](https://github.com/googleapis/nodejs-dialogflow)

## Prerequisites

- Create a new file called `.env` to store the environment variables to be used by project. Here is the list of environment variables which you must put inside it

```json
{
  "TELEGRAM_BOT_TOKEN": "your_telegram_API_key",
  "GOOGLE_PROJECT_ID": "your_gCloud_project_ID",
  "GOOGLE_APPLICATION_CREDENTIALS": "dir_of_gcloud_credentials",
  "FIREBASE_ADMIN_CREDENTIALS": "dir_of_firebase_admin_credentials",
  "SERVER_KEY": "your_gCloud_server_key",
  "FIREBASE_API_KEY": "your_firebase_API_key"
}
```

- As you must see, there are **two** credentials file inside the environments. Those are the `credentials.json` which you must get from google API. You can check out this link [here](https://cloud.google.com/docs/authentication/getting-started) to acquire it and save it into directory `public/auth`
- Install the dependencies `npm install`
- Start the server by `npm run start` _or_ `npm run dev`
- **Note!!** Our bot configuration is declared in directory `src/config/bot`

## Usable

To check how it's done, just add the bot with username `HafizhIBot` **disclosed** <br />

## Training Phrases

These are the phrases which you can train to our bot

1. `Show what you can do` <br />
   _To list all the training phrases from our bot_

2. `I want to find some location` <br />
   _To get the locations near you and bookmark it_

3. `I want to see the bookmarks` <br />
   _To see all the places which you have bookmarked_

**Check out our Bot Version 2 README** [here](public/readme/README.md)

## Deployment

For the deployment, we use **docker** and push it into docker hub container registry. Then we deploy it into **Microsoft Azure App Service**

## Main Dependencies

- ts-node
- express
- firebase
- node-telegram-bot-api
- request-promise
- dialogflow

## Screenshots

<div style="display:flex;flex-flow:row-wrap;">

<img src="https://github.com/DitoHI/Chatbot-Telegram/blob/master/public/screenshots/1_list_actions.png" width="200" height="100%"/>

<img src="https://github.com/DitoHI/Chatbot-Telegram/blob/master/public/screenshots/2_find_location.png" width="200" height="100%"/>

<img src="https://github.com/DitoHI/Chatbot-Telegram/blob/master/public/screenshots/2b_find_location.png" width="200" height="100%"/>

<img src="https://github.com/DitoHI/Chatbot-Telegram/blob/master/public/screenshots/2c_find_location.png" width="200" height="100%"/>

<img src="https://github.com/DitoHI/Chatbot-Telegram/blob/master/public/screenshots/3_see_bookmarks.png" width="200" height="100%"/>

</div>

## License

MIT
