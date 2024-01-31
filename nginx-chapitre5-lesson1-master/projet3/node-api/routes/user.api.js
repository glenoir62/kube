const router = require('express').Router();
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const publicKey = process.env.JWT_PUBLIC_KEY;

router.post('/', async (req, res) => {
  const body = req.body;
  const user = new UserModel({
    name: body.name,
    email: body.email,
    password: await bcrypt.hash(body.password, 8),
  });
  try {
    await user.save();
    res.json(null);
  } catch (err) {
    console.error(err);
    res.status(400).json("Erreur lors de l'inscription");
  }
});

router.get('/current', async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, publicKey);
      const user = await UserModel.findById(decodedToken.sub)
        .select('-password -__v')
        .exec();
      if (user) {
        res.json(user);
      } else {
        res.json(null);
      }
    } catch (e) {
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

module.exports = router;
