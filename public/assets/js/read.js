const renderStories = storyData => {
  $("#add-to-me").html("");
  $("#add-to-me").addClass("mainYellow");
  if(!storyData[0]){
    $("#add-to-me").append(`<h2>No stories by this author can be found.</h2><hr>`)
    return;
  }
  storyData.forEach(story => {
    $("#add-to-me").append(`<p>${story.text}</p><hr>`)
  });
};

const getSearchResults = author => {
  // console.log(author);
  $.get("/api/stories/search/" + author, (storyData) => {
    renderStories(storyData);
  });
};

$("#continueSubmitSearch").on("click", function(event) {
  event.preventDefault();
  getSearchResults($("#entryAuthorSearch").val());
});