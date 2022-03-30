import mongoose from 'mongoose';

const uriByEnv = {
  test: 'mongodb://root:root@0.0.0.0:27017/expresskuntest',
  local:
    process.env.MONGODB_URI || 'mongodb://root:root@0.0.0.0:27017/expresskun',
};

const { ENV } = process.env;
const uri = ENV === 'test' ? uriByEnv.test : uriByEnv.local;

const initDB = () => {
  return mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log(err.message);
        throw new Error('Error Connecting to Database');
      }
    }
  );
};

export default initDB;
