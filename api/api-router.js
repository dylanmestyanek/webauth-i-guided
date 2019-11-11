const router = require('express').Router();
const bcrypt = require('bcryptjs');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);

  const originalPassword = credentials.password;
  credentials.password = hash;

  res.status(201).json({ 
    password: originalPassword, 
    hash: hash
  })
});

module.exports = router;
