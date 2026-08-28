const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Render'ın uyumasını önleyen web sunucusu
app.get('/', (req, res) => res.send('26.2 AFK Bot 7/24 Aktif!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'toggrade.aternos.me', // Aternos IP adresin
    port: 21578,                         // Port numaran (Aternos varsayılanı)
    username: 'AFK_Bot',            // Botun oyundaki adı
    version: '26.2'                      // 26.2 Sürümünü açıkça belirtiyoruz
  });

  bot.on('spawn', () => {
    console.log('Bot 26.2 sunucusuna başarıyla katıldı!');
    
    // Sunucudan AFK sebebiyle atılmamak için 30 saniyede bir zıplama hareketi
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bağlantı kesildi, 15 saniye sonra tekrar bağlanılıyor...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', err => console.log('Bot hatası:', err));
}

createBot();
