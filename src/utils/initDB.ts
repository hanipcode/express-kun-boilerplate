import mongoose from 'mongoose';

const uriByEnv = {
  test: 'mongodb://localhost:27017/forumTest',
  local: 'mongodb://localhost:27017/forum'
};

const { ENV } = process.env;
const uri = ENV === 'test' ? uriByEnv.test : uriByEnv.local;

const initDB = () => {
  return mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useFindAndModify: false
    },
    err => {
      if (err) {
        console.log(err.message);
        throw new Error('Error Connecting to Database');
      }
    }
  );
};

export default initDB;
