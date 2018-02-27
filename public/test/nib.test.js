// const assert = window.assert;
const assert = chai.assert;


describe("The canary", function() {
  it("should tweet", function() {
    assert.equal(1, 1);
  });
});

describe("$get", function() {
  it("should exist", function() {
    assert.equal(typeof window.handler.$get, "function");
  });

  let xhr, requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  afterEach(function () {
    xhr.restore();
  });

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
    let test_response = '{ "_id": "1000", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "Crocodile Tears" }';

    window.handler.$get(test_route, callback);
    requests[0].respond(
      200,
      { "Content-Type": "application/json; charset=utf-8" },
      test_response
    );

    assert.equal(true, callback.called);
  });

  it("gets the correct response payload", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";
    let test_response = '{ "_id": "1000", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "Crocodile Tears" }';

    window.handler.$get(test_route, callback);
    requests[0].respond(
      200,
      { "Content-Type": "application/json; charset=utf-8" },
      test_response
    );

    assert.equal(true, callback.calledWith(test_response));
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



});
