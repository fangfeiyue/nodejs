const express = require('express');
const router = express.Router();

router.post('/login', function(req, res, next){
  const { username, password } = req.body;

  console.log('这是啥', req.body)

  res.json({
    username,
    password
  });
});

module.exports = router;
