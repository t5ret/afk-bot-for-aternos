const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'toggrade.aternos.me', // Aternos IP adresin
    port: 21578,                         // Port numaran
    username: 'AFK_Bot_26_2',            // Bot adı
    version: '26.2'                      // 26.2 sürümü
  });

  bot.on('spawn', () => {
    console.log('Bot 26.2 sunucusuna bağlandı!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bağlantı koptu, 15s sonra tekrar deneniyor...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Hata:', err));
}

createBot();
