/*
 * Route dealing with cookies setting is defined here
 * Since this file is loaded in server.js into /login, this route handle a GET request to the /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");

const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT id FROM users LIMIT 1`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const cookies = data.rows;
        res.cookie("user_id", cookies[0].id);
        res.redirect("categories");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
