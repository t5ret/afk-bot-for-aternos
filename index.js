const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'toggrade.aternos.me',
    port: 21578,
    username: 'AFK_Bot',
    version: false
  });

  let jumpInterval = null;

  bot.on('spawn', () => {
    console.log('✅ Bot Aternos sunucusuna başarıyla bağlandı!');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message === '!zip') {
      if (!jumpInterval) {
        jumpInterval = setInterval(() => {
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 1000);
        }, 3000);
        bot.chat('Zıplama başlatıldı!');
      }
    }

    if (message === '!dur') {
      if (jumpInterval) {
        clearInterval(jumpInterval);
        jumpInterval = null;
        bot.chat('Zıplama durduruldu.');
      }
    }

    if (message === '!gel') {
      const target = bot.players[username]?.entity;
      if (target) {
        bot.chat('Yanına geliyorum!');
        bot.lookAt(target.position.offset(0, target.height, 0));
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 3000);
      } else {
        bot.chat('Seni göremiyorum!');
      }
    }
  });

  bot.on('end', () => {
    console.log('⚠️ Bağlantı koptu, 10 saniye sonra tekrar deneniyor...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => console.log('❌ Hata:', err.message));
}

startBot();
