describe("getNote()", function() {

  // XMLHttpRequest setup
  let xhr, requests;

  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
    window.notes.push({
      "_id": "1000",
      "note_text": "Test Note 1000",
      "created_date": "2017-12-01T19:34:14.565Z",
      "modified_date": "",
      "title": "Test Title 1000"
    });
    console.log(window.notes[window.notes.length - 1]);
  });

  after(function () {
    xhr.restore();
    window.notes.pop();
  });

  it("should exist", function() {
    assert.equal(typeof window.handler.getNote, "function");
  });

  it("should stick the note into displayNote()", function() {
    let test_id = "1000";
    let expected_data = window.notes[window.notes.length - 1];
    let resulted_data;

    function displayNote(data) {
      resulted_data = data;
      return data;
    }

    window.handler.getNote(test_id);

    assert.equal(resulted_data.note_text, expected_data.note_text);

      
  });

  it("should get the note's text", function() {
    let test_id = "1000";
    let expected_note = "Test Note 1000";
    let result;

    window.handler.getNote(test_id);

    result = document.getElementById("edit-note").value;

    assert.equal(result.note_text, expected_note);
  });


  // ideally, getNote is in the Controller
  // and displayNote is in the View
  // -- the View takes the note pieces and builds the display_note
  it("should send the note to the textbox (#edit-note)", function() {
    let test_id = "1000";
    let xhr = {
      header: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
      response: '{ "_id": "1000", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "Crocodile Tears" }'
    }
    let result = '';
    let expected_note = 'Crocodile Tears'

    window.handler.getNote(test_id);
    requests[0].respond( xhr.status, xhr.header, xhr.response);
    result = document.getElementById("edit-note").value;

    assert.equal(result, expected_note);
    
  });

  it("should respond gracefully if there is no note", function() {
    let test_id = "1000";
    let xhr = {
      header: { "Content-Type": "application/json; charset=utf-8" },
      status: 404,
      response: ''
    }
    let error_response = "Whoops! No Note!";
    let result = '';

    window.handler.getNote(test_id);
    requests[0].respond( xhr.status, xhr.header, xhr.response);
    result = document.getElementById("edit-note").value;

    assert.equal(result, error_response);
  });

});
