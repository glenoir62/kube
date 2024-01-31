const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || '8000';
const router = require('./routes');

require('./database');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(port);
