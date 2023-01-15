$(function () {
  // Saving events
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

  // Color coordination
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

  // Populate events
  function populateEvents() {
    for (i = 0; i < 11; i++) {
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

  // Display current date
  var currentDate = dayjs().format('MMM DD, YYYY');
  $("#currentDay").text(currentDate);
});