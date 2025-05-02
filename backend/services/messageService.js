const Message = require('../models/Message');

const unlockDailyMessage = async () => {
  const currentDay = calculateCurrentDay();
  await Message.updateOne(
    { day: currentDay },
    { $set: { isUnlocked: true } }
  );
};

// Add this to your server's cron job setup
// This runs every day at 8 AM
const cron = require('node-cron');
cron.schedule('0 8 * * *', unlockDailyMessage);

module.exports = { unlockDailyMessage };