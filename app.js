const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const process = require('process');
const routes = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { devMongoUrl } = require('./helpers/utils');
const { limiter } = require('./helpers/rateLimiter');

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;
const dataBaseUrl = NODE_ENV === 'production' ? DB_URL : devMongoUrl;
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(dataBaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB!!!');
});

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Server is working! Port: ${PORT}`);
});
app.use(errors());

app.use(handleErrors);
