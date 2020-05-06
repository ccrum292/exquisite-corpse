let arrayOfStoiesWithOneEntry;
let arrayOfStoiesWithTwoEntries;

$(document).ready(function () {
  $("textarea#story").characterCounter();
  $("textarea#entry").characterCounter();

  $.get("/api/stories/write", stories => {
    arrayOfStoiesWithOneEntry = stories.filter(story => {
      if(story.numberOfEntries === 1){
        return story
      }
    });
    arrayOfStoiesWithTwoEntries = stories.filter(story => {
      if(story.numberOfEntries === 2){
        return story
      }
    });
    displaySentencesTorso();
    displaySentencesLegs();
  });
});


// these three functions make the skip button work
const matchFunction = (longString) => {
  if(!longString){
    return `There are no stories to display`;
  }
  const splitText = longString.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
  if(splitText.length>1){
    return splitText[splitText.length - 1];
  }
  return splitText[0];
}

let torsoCounter = 0;
const displaySentencesTorso = () => {
  if(!arrayOfStoiesWithOneEntry[0]){
    return $("#lastEntryT").html('There are Currently no "torso" story sections to continue.  Please create a head above or legs below.');
  }
  const displaySentence = matchFunction(arrayOfStoiesWithOneEntry[torsoCounter].text);
  const displayId = arrayOfStoiesWithOneEntry[torsoCounter]._id;
  $("#lastEntryT").html(displaySentence);
  $("#lastEntryT").attr("data-id", displayId);
  if (torsoCounter < arrayOfStoiesWithOneEntry.length-1) {
    torsoCounter++;
  }else{
    torsoCounter = 0;
  }
}

let legsCounter = 0;
const displaySentencesLegs = () => {
  if(!arrayOfStoiesWithTwoEntries[0]){
    return $("#lastEntryL").html('There are Currently no "legs" story sections to continue.  Please create a head or torso above.');
  }
  const displaySentence = matchFunction(arrayOfStoiesWithTwoEntries[legsCounter].text);
  const displayId = arrayOfStoiesWithTwoEntries[legsCounter]._id;
  $("#lastEntryL").html(displaySentence);
  $("#lastEntryL").attr("data-id", displayId);
  if (legsCounter < arrayOfStoiesWithTwoEntries.length-1) {
    legsCounter++;
  }else{
    legsCounter = 0;
  }
}

$("#nextBtn1").on("click", displaySentencesTorso);
$("#nextBtn2").on("click", displaySentencesLegs);


// onClick for making a new story
$("#createSubmit").on("click", function (event) {
  event.preventDefault();
  if($("#story").val() && $("#storyAuthor").val() && $("#story").val().match(/\(?[^\.\?\!]+[\.!\?]\)?/g)){
    postStory($("#story").val(), $("#storyAuthor").val());
  }
});

// Creates the initial story (the head)
// workin
const postStory = (text, author) => {
  $.ajax("/api/stories", {
    type: "POST",
    data: { authors: [{ authorName: author}], text: text }
  }).then(() => {
    location.reload();
  })
}


// onClick for updating story
const updateStory = (id, author, updatedText, numberOfEntries) => {
  $.ajax("/api/stories/" + id, {
    type: "PUT",
    data: { authorName: { authorName: author }, text: updatedText, numberOfEntries: numberOfEntries }
  }).then(() => {
    location.reload();
  })
};

$("#continueSubmitT").on("click", function (event) {
  event.preventDefault();
  const oldText = arrayOfStoiesWithOneEntry.filter(storydata => {
    if(storydata._id === $("#lastEntryT").data("id")){
      return storydata;
    }
  })
  if($("#entryT").val() && $("#entryAuthorT").val() && $("#entryT").val().match(/\(?[^\.\?\!]+[\.!\?]\)?/g) && !($("#lastEntryT").data("id") === "")){
    updateStory($("#lastEntryT").data("id"), $("#entryAuthorT").val(), oldText[0].text + " " + $("#entryT").val(), 2)
  };
});

$("#continueSubmitL").on("click", function (event) {
  event.preventDefault();
  const oldText = arrayOfStoiesWithTwoEntries.filter(storydata => {
    if(storydata._id === $("#lastEntryL").data("id")){
      return storydata;
    }
  })
  console.log($("#entryL").val() && $("#entryAuthorL").val() && $("#entryL").val().match(/\(?[^\.\?\!]+[\.!\?]\)?/g) && !($("#lastEntryL").data("id") === ""))
  if($("#entryL").val() && $("#entryAuthorL").val() && $("#entryL").val().match(/\(?[^\.\?\!]+[\.!\?]\)?/g) && !($("#lastEntryL").data("id") === "")){
    updateStory($("#lastEntryL").data("id"), $("#entryAuthorL").val(), oldText[0].text + " " + $("#entryL").val(), 3)
  };
});


//Random words boxes
const randomizer = (container, list) => {
  $(container).removeClass("hide");
  $(list).empty();
  $.get("/api/randomword").then(rWords => {
    rWords.forEach(function (word) {
      $(list).append($("<li>").text(word));
    });
  });
};

$("#wordRandomizer1").on("click", event => {
  event.preventDefault();
  randomizer("#randomContainer1", "#randomWordsList1");
});

$("#wordRandomizer2").on("click", event => {
  event.preventDefault();
  randomizer("#randomContainer2", "#randomWordsList2");
});

$("#wordRandomizer3").on("click", event => {
  event.preventDefault();
  randomizer("#randomContainer3", "#randomWordsList3");
});

// anime.js
anime({
  targets: ".wordRandomizer",
  keyframes: [
    {translateX: 10},
    {translateX: -10}
  ],
  loop: true,
  easing: "easeOutQuad",
  delay: 10000
});