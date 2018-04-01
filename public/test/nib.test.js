// const assert = window.assert;
const assert = chai.assert;


describe("The canary", function() {
  it("should tweet", function() {
    assert.equal(1, 1);
  });
});

describe("createNote", function() {
  it("should exist", function() {
    assert.equal(typeof window.handler.createNote, "function");
  });

  // ------------------------------- SET UP
  let xhr, requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
    xhr.restore();
  });

  it("should format the parcel correctly", function() {
    let test_textarea = document.createElement('textarea');
    let test_text = document.createTextNode('How now brown cow?');
    test_textarea.appendChild(test_text);

    document.getElementById("edited-note").value;

    window.handler.createNote(


  });
});

describe("$post", function() {
// need to test that the @parcel is formatted correctly
  it("should exist", function() {
    assert.equal(typeof window.handler.$post, "function");
  });

  // ------------------------------- SET UP
  let xhr, requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
    xhr.restore();
  });

  it("creates a POST request", function() {
    let route = 1,
        parcel = 2,
        callback = function() {},
        expected_method = "POST";

    window.handler.$post(route, parcel, callback);

    assert.equal(requests[0].method, expected_method);
  });

  it("should set the correct header", function() {
    let route = 1,
        parcel = 2,
        callback = function() {},
        expected_header = "application/json";

    window.handler.$post(route, parcel, callback);

    assert.equal(requests[0].requestHeaders["Content-Type"].substring(0,16), expected_header);
  });

  it("should send the POST request", function() {
    let route = 1,
        parcel = 2,
        callback = function() {};

    window.handler.$post(route, parcel, callback);

    console.log(JSON.stringify(requests[0]));
    assert(requests[0].sendFlag);
  });

  it("should take a callback", function() {
    let route = 1,
        parcel = 2,
        callback = sinon.spy();

    window.handler.$post(route, parcel, callback);
    requests[0].respond();

    console.log(callback.args[0]);
    assert.ok(callback.called);
  });

});

describe("$get", function() {
  it("should exist", function() {
    assert.equal(typeof window.handler.$get, "function");
  });

  // ------------------------------- SET UP
  let xhr, requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
    xhr.restore();
  });

  // ------------------------------- TESTS
  it("makes a GET request", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";

    window.handler.$get(test_route, callback);

    assert.equal(requests.length, 1);
  });

  it("opens the correct route", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";

    window.handler.$get(test_route, callback);

    assert.equal(requests[0].url, test_route);
  });

  it("takes a response", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";
    let xhr = {
      header: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
      response: '{ "_id": "1000", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "Crocodile Tears" }'
    }

    window.handler.$get(test_route, callback);
    requests[0].respond( xhr.status, xhr.header, xhr.response);

    assert.equal(true, callback.called);
  });

  it("gets the correct response payload", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";
    let xhr = {
      header: { "Content-Type": "application/json; charset=utf-8" },
      status: 200,
      response: '{ "_id": "1000", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "Crocodile Tears" }'
    }

    window.handler.$get(test_route, callback);
    requests[0].respond( xhr.status, xhr.header, xhr.response);

    assert.equal(true, callback.calledWith(null, xhr.response));
  });

  it("responds gracefully to non-202 status", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";
    let xhr = {
      header: { "Content-Type": "application/json; charset=utf-8" },
      status: 404,
      response: ''
    }

    window.handler.$get(test_route, callback);
    requests[0].respond( xhr.status, xhr.header, xhr.response);

    assert.equal(true, callback.calledWith(xhr.status));
  });

});


describe("getNote()", function() {

  // XMLHttpRequest setup
  let xhr, requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
    xhr.restore();
  });

  it("should exist", function() {
    assert.equal(typeof window.handler.getNote, "function");
  });

  it("should call the correct route", function() {
    let test_id = "1000";
    let expected_route = "/get/:" + test_id;

    window.handler.getNote(test_id);

    assert.equal(requests[0].url, expected_route);
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
