var db = require("../models");
module.exports = function(app) {

  // render index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // render read page with the ten most recetly made and completed stories
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


  // app.get("/read", function(req, res) {
  //   db.Story.findAll({
  //     include: [db.Entry]
  //   })
  //     .then(function(storyData){
  //       var allStoryStrings = [];
  //       var allAuthors = [];
  //       storyData.forEach(function(val){
  //         if(allStoryStrings.length<10){
  //           if(val.dataValues.Entries.length === 3){
  //             var entriesArray = val.dataValues.Entries;
  //             var storyObject = "";
  //             var authorString = "";
  //             entriesArray.forEach(function(result){
  //               storyObject += (" " + result.dataValues.text);
  //               if(result.dataValues.author){
  //                 authorString += (" " + result.dataValues.author);
  //               }
  //             });
  //             allStoryStrings.unshift(storyObject);
  //             var split = authorString.split(" ");
  //             var editedString = {author: ""};
  //             if(split.length === 4){
  //               editedString = split[1] + ", " + split[2] + ", and " + split[3];
  //               allAuthors.unshift(editedString);
  //             }else if(split.length === 3){
  //               editedString = split[1] + " and " + split[2];
  //               allAuthors.unshift(editedString);
  //             }else{
  //               allAuthors.unshift(authorString);
  //             }
  //           }
  //         }
  //       });
  //       res.render("read", { storyData: allStoryStrings, authorData: allAuthors});
  //       // console.log("please work");
  //     });
  // });

  app.get("/write", function(req, res) {
    db.Story.findAll({
      include: [db.Entry]
    })
      .then(function(entryData){
        if(entryData.length>1 || entryData.length ===1){
          var lastSentence = [];
          var idOfLastSentence = [];
          entryData.forEach(function(val){
            if(lastSentence.length<10){
              if(val.dataValues.Entries.length<3){
                var allText;
                var last = {};
                var storyId = {};
                var splitText;
                if(val.dataValues.Entries.length>1){
                  allText = val.dataValues.Entries[val.dataValues.Entries.length-1].dataValues.text;
                  splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
                  if(splitText.length>1){
                    last.text = splitText[splitText.length - 1];
                  }else{
                    last.text = splitText[0];
                  }
                  storyId.storyId = val.dataValues.Entries[val.dataValues.Entries.length-1].dataValues.StoryId;
                  lastSentence.push(last);
                  idOfLastSentence.push(storyId);
                }else if(val.dataValues.Entries.length === 1){
                  allText= val.dataValues.Entries[0].dataValues.text;
                  splitText = allText.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
                  if(splitText === null){
                    last.text = allText;
                  }else{
                    if(splitText.length>1){
                      last.text = splitText[splitText.length - 1];
                    }else{
                      last.text = splitText[0];
                    }
                  }
                  storyId.storyId = val.dataValues.Entries[0].dataValues.StoryId;
                  lastSentence.push(last);
                  idOfLastSentence.push(storyId);
                }
              }
            }
          });
          const idOfLastStory = [{}];
          idOfLastStory[0].id = entryData[entryData.length - 1].id + 1;

          console.log({ lastSentence: lastSentence, idOfLastSentence: idOfLastSentence, idOfLastStory: idOfLastStory });
          res.render("write", { lastSentence: lastSentence, idOfLastSentence: idOfLastSentence, idOfLastStory: idOfLastStory});
        }else{
          var passInObject = [{id: "0"}];
          res.render("write", { idOfLastStory: passInObject});
        }
      });
  });

};