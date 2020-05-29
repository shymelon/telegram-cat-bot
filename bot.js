const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = process.env.TOKEN;
const catApiKey = process.env.CAT_API_KEY;
const options = {
  webHook: {
    port: process.env.PORT,
  },
}

const bot = new TelegramBot(token, options);
const externalUrl = process.env.EXTERNAL_URL;
bot.setWebHook(`${externalUrl}/bot${token}`);


bot.onText(/\/catto/, async (msg) => {
  const url = 'https://api.thecatapi.com/v1/images/search';
  const chatId = msg.chat.id;
  try{
    const response = await fetch(url, {
      headers: {
        'x-api-key': catApiKey,
      },
    });
    const catImages = await response.json();
    const catImageUrl = catImages[0].url;
    bot.sendPhoto(chatId,catImageUrl);
  }catch (e) {
    bot.sendMessage(chatId,'Yikes, we\'ve got a broken pic, retry.');
  }
});
