const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://root:mongodb@localhost:27017/week9?authSource=admin', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//app.use(cors({ origin: 'http: 192.168.2.18 }))
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..' , 'uploads')));
app.use(routes);

app.listen(3001);