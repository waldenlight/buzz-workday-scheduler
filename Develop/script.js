// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function saveEvent(event) {
    var currentEvent = $(event.target);
    var eventText = currentEvent.parent('div').children('textarea');
    var eventId = currentEvent.parent('div').attr('id');
    var scheduledEvent = {
      text: eventText.val()
    }
    window.localStorage.setItem(eventId, JSON.stringify(scheduledEvent));
  }

  $('.saveBtn').click(saveEvent)

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var currentHour = dayjs().format("H");

  // Loop through all the time blocks and add the appropriate class
  for (var i = 9; i < 18; i++) {
    var hour = $(".container-fluid").children().eq(i - 9);
    if (i < currentHour) {
      // Remove other classes if previously there
      hour.removeClass("future");
      hour.removeClass("present");
      // Add appropriate class
      hour.addClass("past");
    } else if (i > currentHour) {
      // Remove other classes if previously there
      hour.removeClass("past");
      hour.removeClass("present");
      // Add appropriate class
      hour.addClass("future");
    } else {
      // Remove other classes if previously there
      hour.removeClass("past");
      hour.removeClass("future");
      // Add appropriate class
      hour.addClass("present");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('MMM DD, YYYY');
  $("#currentDay").text(currentDate);
});

function populateEvents() {
  for (i = 0; i < 10; i++) {
    // Get the id of the event
    eventId = $(".container-fluid").children('.row').eq(i).attr('id');
    // Get the current event local storage data
    currentEventLocalObject = JSON.parse(localStorage.getItem(eventId));
    // Get the text area for the event
    currentEventText = $(".container-fluid").children('.row').eq(i).children('textarea');
    // If local storage objects exist, access text and populate
    if (currentEventLocalObject) {
      currentEventText.text(currentEventLocalObject.text);
    }
  }
}

populateEvents();