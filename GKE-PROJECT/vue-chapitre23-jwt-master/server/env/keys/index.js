const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./env/keys/jwtRS256.key'),
    keyPub: fs.readFileSync('./env/keys/jwtRS256.key.pub'),
}