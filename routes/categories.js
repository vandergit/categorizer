/* Name     : ./routes/cookies.js
 * Author(s): Polina, Jose, Jairo
 * Date     : Sep 24, 2021
 * Purpose  : Validate the API response
 *            Endpoints get data from the PostgresSQL DB (midterm)
 * See      : https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { isMovie, isBook, isProduct, isCafe } = require("./api");

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const getActivities = (categoryId) => {//function for sorting rows from database
    return db.query(`SELECT * FROM activities WHERE category_id = $1 ORDER BY description;`, [
      categoryId,
    ]);
  };

  router.get("/", (req, res) => {
    Promise.all([
      getActivities(1),
      getActivities(2),
      getActivities(3),
      getActivities(4),
    ])
      .then((data) => {
        const [movies, restaurants, books, things] = data;//get data from database to pass it to render the page
        const templateVars = {
          movies: movies.rows,
          restaurants: restaurants.rows,
          books: books.rows,
          things: things.rows,
        };
        res.render("categories", templateVars);
      })
      .catch((err) => res.status(500).send(err));
  });

  router.post("/", (req, res) => {
    const text = req.body.text;//get html input
    Promise.all([
      isProduct(text),
      isMovie(text),
      isCafe(text),
      isBook(text)
    ])
      .then(result=>{
        let queryString = "";
        if (result[0] === "ExpandedFood") {
          queryString = `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`;
        } else if (result[1] === "movie" || result[1] === "series") {
          queryString = `INSERT INTO activities (user_id, category_id, description) VALUES (1,1,$1)`;
        } else if (result[2].includes("restaurant") || result[2].includes("cafe") || result[2].includes("bakery")) {
          queryString = `INSERT INTO activities (user_id, category_id, description) VALUES (1,2,$1)`;
        } else if (result[3] === '"BOOK"') {
          queryString = `INSERT INTO activities (user_id, category_id, description) VALUES (1,3,$1)`;
        } else {
          queryString = `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`;
        }
        return db.query(queryString, [text])//pass query to the database
      })
      .then((data) => {
        res.redirect("/categories");//refresh the page with new data
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  router.put('/edit', (req, res) => {//drag-n-drop implementation
    db.query(
      `UPDATE activities
      SET category_id = $1
      WHERE id = $2;`,
      [req.body.category_id, req.body.item_id]//data from the front-end
    )
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => console.log(err.massage));
  });

  router.post('/delete', (req, res) => {//delete button implementation
    db.query(
      `DELETE FROM activities
        WHERE id = $1;`,
      [req.body.activity_id]
    )
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => console.log(err.massage));
  });

  return router;
};
