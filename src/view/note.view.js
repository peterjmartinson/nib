(function() {
  'use strict';

  function parseDate(date) {
    let annum = new Date(date),
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        display_date = "";
    display_date += months[annum.getMonth()];
    display_date += " " + annum.getDate();
    display_date += ", " + annum.getFullYear();
    return display_date;
  }

  function viewNotes(docs) {
  }


  module.exports = {
    viewNotes
  }

}())
