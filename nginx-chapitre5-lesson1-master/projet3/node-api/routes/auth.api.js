const router = require('express').Router();
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const privateKey = process.env.JWT_PRIVATE_KEY;

router.post('/', async (req, res) => {
  const body = req.body;
  const user = await UserModel.findOne({ email: body.email }).exec();
  if (user) {
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = jsonwebtoken.sign({}, privateKey, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
      });
      res.cookie('token', token);
      res.json(user);
    } else {
      res.status(400).json('Mauvais email ou mot de passe');
    }
  } else {
    res.status(400).json('Mauvais email ou mot de passe');
  }
});

router.delete('/', async (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
