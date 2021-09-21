const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const { params } = req;
    db.query(
      `
    SELECT * FROM activities
    ${params.category_id ? "WHERE category_id = $1;" : ";"}
    `,
      [params.category_id]
    )
      .then((data) => {
        const activities = data.rows;
        res.json({ activities });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
        console.log(err);
      });
  });
  return router;
};
