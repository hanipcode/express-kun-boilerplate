import app from './app';

const { ENV } = process.env;
const PORT = 8000;
app.listen(process.env.PORT || PORT, () => {
  if (ENV !== 'test') {
    console.log(`successfully run app in port ${PORT}`);
  }
});
