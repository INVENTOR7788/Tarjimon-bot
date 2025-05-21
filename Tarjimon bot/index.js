
require('dotenv').config();
require('dotenv').config();

console.log('BOT_TOKEN:', process.env.BOT_TOKEN); 

const TelegramBot = require('node-telegram-bot-api');
const translate = require('@vitalets/google-translate-api');

const token = '7723363818:AAFrBN4PrfkqOR_gjP7MyGr3XORqN667QlA';

const bot = new TelegramBot(token, { polling: true });

console.log(' Bot ishga tushdi...');

const dictionary = {
  'salom': 'こんにちは (Konnichiwa)',
  'rahmat': 'ありがとう (Arigatou)',
  'yaxshi': 'いい (ii)',
  'kitob': '本 (hon)',
  'maktab': '学校 (gakkou)',
  'oila': '家族 (kazoku)',
  'yemak': '食べ物 (tabemono)',
  'suv': '水 (mizu)',
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    ` Salom, ${msg.from.first_name}!\n\nMen Yapon tili tarjimon botiman.\n\n Siz matn yuborsangiz, men uni yapon tiliga tarjima qilaman.\n\nAgar matn faqat bitta so‘z bo‘lsa (masalan: "salom", "kitob"), men uni o‘z lug‘atimdan tarjima qilaman.\n\nYuboring!`
  );
});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim().toLowerCase();

  
  if (!text || text.startsWith('/')) return;


  if (dictionary[text]) {
    bot.sendMessage(chatId, ` So‘z tarjimasi:\n<b>${text}</b> → ${dictionary[text]}`, {
      parse_mode: 'HTML',
    });
    return;
  }


  try {
    const res = await translate(text, { to: 'ja' });
    bot.sendMessage(chatId, `🇯🇵 Yaponcha tarjima:\n${res.text}`);
  } catch (error) {
    console.error('Tarjima xatosi:', error);
    bot.sendMessage(chatId, ' Tarjima vaqtida xatolik yuz berdi. Keyinroq urinib ko‘ring.');
  }
});
