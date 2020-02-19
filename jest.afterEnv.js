const mongoose = require('mongoose');

module.exports = async function() {
  let connection = await mongoose.connect(
    'mongodb://localhost:27017/forumTest'
  );
  await connection.connection.db.dropDatabase();
  await mongoose.disconnect();
  console.log('finish');
  if (!process.env.DEBUGGER) {
    process.exit(0);
  }
};
