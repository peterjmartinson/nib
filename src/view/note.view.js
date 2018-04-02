// Currently, this is not used anywhere
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
    let output_docs = new Array();
    for (let i = 0; i < docs.length; i++) {
      output_docs.push(docs[i]);
    }
    return output_docs;
  }


  module.exports = {
    viewNotes
  }

}())
