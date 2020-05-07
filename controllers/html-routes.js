var db = require("../models");
module.exports = function(app) {

  // render index page
  // workin
  app.get("/", function(req, res) {
    res.render("index");
  });

  // render read page with the ten most recetly made and completed stories
  // workin
  app.get("/read", (req, res) => {
    db.Stories.find({ numberOfEntries: 3 }).sort({ dateCreated: -1 }).limit(10)
      .then(dbStories => {
        const textArray = dbStories.map(data => data.text);
        const authorArray = [];
        dbStories.forEach(val => {
          const allAuthors = [];
          let newString = "";          
          val.authors.forEach(authorObj => {
            if(allAuthors.indexOf(authorObj.authorName) === -1){
              allAuthors.push(authorObj.authorName)
            }
          });
          
          if(allAuthors.length === 3){
            newString = `${allAuthors[0]}, ${allAuthors[1]}, and ${allAuthors[2]}`
          }else if(allAuthors.length === 2){
            newString = `${allAuthors[0]} and ${allAuthors[1]}`
          }else{
            newString = allAuthors[0];
          }
          
          authorArray.push(newString);
        });

        res.render("read", { textArray: textArray, authorArray: authorArray })
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  })

  // renders write page and last sentence of 
  // workin
  app.get("/write", function(req, res) {
    res.render("write");
  });

};