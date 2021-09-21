const {isMovie, isBook, isProduct, isCafe} = require('./api');
console.log("I am here", isProduct);
//console.log(isProduct);

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });

    const text = req.body.text;
    console.log('funct:',isProduct(text));
    isProduct(text).then(res=>{
      console.log("Jairo!!!!!",res);
      console.log(res === 'ExpandedFood');
      if (res === 'ExpandedFood') {
        db.query(`INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,[text])
          .then(data => {
            console.log('success');
            res.json({ data });
          })
          .catch((err)=>console.log(err.massage));
      } else {
        isMovie(text).then(res=>{
          if (res === 'movie' || res === 'series') {
            db.query(`INSERT INTO activities (user_id, category_id, description) VALUES (1,1,$1)`,[text])
              .then(data => {
                console.log('success');
                res.json({ data });
              })
              .catch((err)=>console.log(err.massage));
          } else {
            isCafe(text).then(res=>{
              if (res.includes('restaurant') || res.includes('cafe')) {
                db.query(`INSERT INTO activities (user_id, category_id, description) VALUES (1,2,$1)`,[text])
                  .then(data => {
                    console.log('success');
                    res.json({ data });
                  })
                  .catch((err)=>console.log(err.massage));
              } else {
                isBook(text).then(res=>{
                  if (res === "Book") {
                    db.query(`INSERT INTO activities (user_id, category_id, description) VALUES (1,3,$1)`,[text])
                      .then(data => {
                        console.log('success');
                        res.json({ data });
                      })
                      .catch((err)=>console.log(err.massage));
                  } else {
                    db.query(`INSERT INTO activities (user_id, category_id, description) VALUES (1,4,$1)`,[text])
                      .then(data => {
                        console.log('success');
                        res.json({ data });
                      })
                      .catch((err)=>console.log(err.massage));
                  }
                });
              }
            });
          }
        });
      }
    });

  });
  return router;
};
