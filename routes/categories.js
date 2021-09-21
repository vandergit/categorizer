const { isMovie, isBook, isProduct, isCafe } = require("./api");
console.log("I am here", isProduct);
//console.log(isProduct);

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const getActivities = (categoryId) => {
    return db.query(`SELECT * FROM activities WHERE category_id = $1;`, [
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
        console.log(data);
        const [movies, restaurants, books, things] = data;
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
    const text = req.body.text;
    // console.log("funct:", isProduct(text));
    Promise.all([
      isProduct(text),
      isMovie(text),
      isCafe(text),
      isBook(text)
    ])
      .then(results=>{
        for (let result of results) {
          if (result === "ExpandedFood") {
            db.query(
              `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
              [text]
            )
              .then((data) => {
                console.log("Food-success");
                result.json({ data });
              })
              .catch((err) => console.log(err.massage));
          }
          if (result === "movie" || result === "series") {
            db.query(
              `INSERT INTO activities (user_id, category_id, description) VALUES (1,1,$1)`,
              [text]
            )
              .then((data) => {
                console.log("Movie-success");
                result.json({ data });
              })
              .catch((err) => console.log(err.massage));
          }
          if (result.includes("restaurant") || result.includes("cafe")) {
            db.query(
              `INSERT INTO activities (user_id, category_id, description) VALUES (1,2,$1)`,
              [text]
            )
              .then((data) => {
                console.log("Restaurant-success");
                result.json({ data });
              })
              .catch((err) => console.log(err.massage));
          }
          if (result === "Book") {
            db.query(
              `INSERT INTO activities (user_id, category_id, description) VALUES (1,3,$1)`,
              [text]
            )
              .then((data) => {
                console.log("Book-success");
                result.json({ data });
              })
              .catch((err) => console.log(err.massage));
          } else {
            db.query(
              `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
              [text]
            )
              .then((data) => {
                console.log("success");
                result.json({ data });
              })
              .catch((err) => console.log(err.massage));
          }

        }
        res.redirect("/categories");
      })
      .catch((err) => res.status(500).send(err));

  });
  return router;
};

// isProduct(text).then((res) => {
//   if (res === "ExpandedFood") {
//     db.query(
//       `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
//       [text]
//     )
//       .then((data) => {
//         console.log("success");
//         res.json({ data });
//       })
//       .catch((err) => console.log(err.massage));
//   } else {
//     isMovie(text).then((res) => {
//       if (res === "movie" || res === "series") {
//         db.query(
//           `INSERT INTO activities (user_id, category_id, description) VALUES (1,1,$1)`,
//           [text]
//         )
//           .then((data) => {
//             console.log("success");
//             res.json({ data });
//           })
//           .catch((err) => console.log(err.massage));
//       } else {
//         isCafe(text).then((res) => {
//           if (res.includes("restaurant") || res.includes("cafe")) {
//             db.query(
//               `INSERT INTO activities (user_id, category_id, description) VALUES (1,2,$1)`,
//               [text]
//             )
//               .then((data) => {
//                 console.log("success");
//                 res.json({ data });
//               })
//               .catch((err) => console.log(err.massage));
//           } else {
//             isBook(text).then((res) => {
//               if (res === "Book") {
//                 db.query(
//                   `INSERT INTO activities (user_id, category_id, description) VALUES (1,3,$1)`,
//                   [text]
//                 )
//                   .then((data) => {
//                     console.log("success");
//                     res.json({ data });
//                   })
//                   .catch((err) => console.log(err.massage));
//               } else {
//                 db.query(
//                   `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
//                   [text]
//                 )
//                   .then((data) => {
//                     console.log("success");
//                     res.json({ data });
//                   })
//                   .catch((err) => console.log(err.massage));
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });
// res.redirect("/categories");

// module.exports = (db) => {
//   router.post("/", (req, res) => {
//     const text = req.body.text;
//     console.log("funct:", isProduct(text));

//     isProduct(text).then((res) => {
//       console.log("Jairo!!!!!", res);
//       console.log(res === "ExpandedFood");
//       if (res === "ExpandedFood") {
//         return db.query(
//           `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
//           [text]
//         )
//           .then((data) => {
//             console.log("success");
//             res.json({ data });
//           })
//           .catch((err) => console.log(err.massage));
//       }
//     });

//     isMovie(text).then((res) => {
//       if (res === "movie" || res === "series") {
//         db.query(
//           `INSERT INTO activities (user_id, category_id, description) VALUES (1,1,$1)`,
//           [text]
//         )
//           .then((data) => {
//             console.log("success");
//             res.json({ data });
//           })
//           .catch((err) => console.log(err.massage));
//       }
//     });

//     isCafe(text).then((res) => {
//       if (res.includes("restaurant") || res.includes("cafe")) {
//         db.query(
//           `INSERT INTO activities (user_id, category_id, description) VALUES (1,2,$1)`,
//           [text]
//         )
//           .then((data) => {
//             console.log("success");
//             res.json({ data });
//           })
//           .catch((err) => console.log(err.massage));
//       }
//     });
//     isBook(text).then((res) => {
//       if (res === "Book") {
//         db.query(
//           `INSERT INTO activities (user_id, category_id, description) VALUES (1,3,$1)`,
//           [text]
//         )
//           .then((data) => {
//             console.log("success");
//             res.json({ data });
//           })
//           .catch((err) => console.log(err.massage));
//       }
//       db.query(
//         `INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,
//         [text]
//       )
//         .then((data) => {
//           console.log("success");
//           res.json({ data });
//         })
//         .catch((err) => console.log(err.massage));
//     });
//   });
//   return router;
// };
