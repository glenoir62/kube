const mongoose = require('mongoose');
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const mongodbhost = process.env.MONGODB_HOST;

const connectionString = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbhost}`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected !');
  })
  .catch((e) => console.log(e));
