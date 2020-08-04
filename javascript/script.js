$(document).ready(function () {
  var dt = new Date();
  document.getElementById("date").innerHTML = dt.toDateString();

  // Get stored data from localStorage and
  // Parse the JSON string to an object
  var dataStorage = JSON.parse(localStorage.getItem("dataStorage"));

  var dataArray = null;
  if (dataStorage !== null) {
    dataArray = dataStorage;
  } else {
    dataArray = new Array(9);
  }

  // set variable referencing planner container
  var plannerDiv = $("#plannerContainer");
  // clear all elements
  plannerDiv.empty();

  // gets the current time in 24 hour format
  var nowHour24 = moment().format("H");

  // build calendar by row from 9 AM to 5 PM
  for (var hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    var index = hour - 9;

    // build row components
    var rowDiv = $("<div>");
    rowDiv.addClass("row");
    rowDiv.addClass("plannerRow");
    rowDiv.attr("hour-index", hour);
    rowDiv.css("border-top", "1px solid black");
    rowDiv.css("border-bottom", "1px solid black");

    // Start building Time box portion of row
    var colTimeDiv = $("<div>");
    colTimeDiv.addClass("col-md-2");

    // create timeBox element (contains time)
    var timeBoxSpn = $("<span>");
    // can use this to get value
    timeBoxSpn.attr("class", "timeBox");

    // format hours time for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    // populate timeBox with time
    timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert col time into row
    colTimeDiv.append(timeBoxSpn);
    rowDiv.append(colTimeDiv);

    // build text input components
    var dailyPlanSpan = $("<input>");

    dailyPlanSpan.attr("id", `input-${index}`);
    dailyPlanSpan.attr("hour-index", index);
    dailyPlanSpan.attr("type", "text");
    dailyPlanSpan.attr("class", "dailyPlan");

    // access index from data array for hour
    dailyPlanSpan.val(dataArray[index]);

    // create col to control width
    var colIptDiv = $("<div>");
    colIptDiv.addClass("col-md-9");

    // add col width and row component to row
    colIptDiv.append(dailyPlanSpan);
    rowDiv.append(colIptDiv);

    // Building save portion
    var colSaveDiv = $("<div>");
    colSaveDiv.addClass("col-md-1");

    var saveBtn = $("<img>");
    saveBtn.attr("id", `saveid-${index}`);
    saveBtn.attr("save-id", index);
    // saveBtn.attr("class", "far fa-save saveIcon");
    saveBtn.attr("class", "saveIcon");
    saveBtn.attr("src", "./images/save-icon.svg");

    // add col width and row component to row
    colSaveDiv.append(saveBtn);
    rowDiv.append(colSaveDiv);

    // set row color based on time
    updateRowColor(dailyPlanSpan, hour);

    // add row to planner container
    plannerDiv.append(rowDiv);
  }

  // function to update row color
  function updateRowColor(dailyPlanText, hour) {
    if (hour < nowHour24) {
      dailyPlanText.css("background-color", "lightgrey");
    } else if (hour > nowHour24) {
      dailyPlanText.css("background-color", "lightgreen");
    } else {
      dailyPlanText.css("background-color", "tomato");
    }
  }

  // saves to local storage
  // onclick function to listen for user clicks on save button
  $(document).on("click", "img", function (event) {
    event.preventDefault();

    var index = $(this).attr("save-id");

    var inputId = "#input-" + index;
    var value = $(inputId).val();

    dataArray[index] = value;
    localStorage.setItem("dataStorage", JSON.stringify(dataArray));
  });
});
