var db = require("../models");
const randomWords = require("random-words");
module.exports = function (app) {


  // $and: [{ numberOfEntries: 3 }, { authors: {authorName: authorSearch }}]
  // searches for stories based on author and numberOfEntries
  // Needs help
  app.get("/api/stories/search/:author", function (req, res) {
    const authorSearch = req.params.author;
    console.log(authorSearch)
    db.Stories.find({ numberOfEntries: 3, "authors.authorName": authorSearch  }).sort({ dateCreated: -1 }).limit(10)
      .then(storyData => {
        return res.json(storyData);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  });


  // gets stories for write page
  // workin
  app.get("/api/stories/write", (req, res) => {
    const randomSort = () => {
      if(Math.floor(Math.random()*10)%2 === 0){
        return -1;
      }
      return 1;
    }
    const skipNum = () => Math.floor(Math.random()*10);
    // use .skip(skipNum()) in future when there are more stories
    db.Stories.find({ numberOfEntries: {$lt: 3} }).sort({ dateCreated: randomSort() }).limit(40)
      .then(dbStories => {
        if(!dbStories[0]){
          return res
            .status(404)
            .send(`No stories in query`)
        }
        
        return res.json(dbStories);
      })
  });

  // Creates a Story, must be passed an object with authors and text
  // Workin
  app.post("/api/stories", (req, res) => {
    db.Stories.create(req.body)
      .then(postedStory => {
        res.json(postedStory);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });


  // delete a story when given a story ID
  // Workin
  app.delete("/api/stories/:id", (req, res) => {
    db.Stories.findByIdAndDelete(req.params.id)
      .then(data => {
        if(!data){
          return res
            .status(404)
            .send(`Story with the id of ${req.params.id} could not be found.`)
        }

        return res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  });


  // Update a story
  // workin
  app.put("/api/stories/:id", (req, res) => {
    db.Stories.findByIdAndUpdate(req.params.id, {$push: {authors: req.body.authorName}, text: req.body.text, numberOfEntries: req.body.numberOfEntries}, {runValidators: true, new: true})
      .then(updatedStory => {
        if(!updatedStory){
          return res
            .status(404)
            .send(`Story with _id: ${req.params.id} does not exist`)
        }

        return res.json(updatedStory);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  });


  //for creating a random words object
  // Workin
  app.get("/api/randomword", function (req, res) {
    res.json(randomWords({exactly:5, wordsPerString:2}));
  });
};
