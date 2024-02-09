const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || '8000';
const router = require('./routes');

require('./database');

const app = express();
app.use(express.static('../client-build'));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-build/index.html'));
})

app.listen(port);