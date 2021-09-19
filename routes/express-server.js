const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));


app.get('/login', (req, res) => {
  // req.session.user_id = user.id;
  res.redirect('categories');
});

app.get('/categories', (req, res) => {
  res.render('categories');
});