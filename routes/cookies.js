/* Name     : ./routes/cookies.js
 * Author(s): Polina, Jose, Jairo
 * Date     : Sep 24, 2021
 * Purpose  : Route dealing with cookies setting
 *            Since this file is loaded in server.js into /login, this route handle a GET request to the /login
 * See      : https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // Select the first user in users table as the logged user
    let query = `SELECT id FROM users LIMIT 1`;
    db.query(query)
      .then((data) => {
        const cookies = data.rows;
        // Set the cookie and send it back to the browser
        res.cookie("user_id", cookies[0].id);
        // Send the app user to the categorizer
        res.redirect("categories");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
