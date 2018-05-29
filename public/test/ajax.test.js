let ajax = new Ajax();

describe("$get", function() {
  it("should exist", function() {
    assert.equal(typeof ajax.$get, "function");
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

    ajax.$get(test_route, callback);

    assert.equal(requests.length, 1);
  });

  it("opens the correct route", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";

    ajax.$get(test_route, callback);

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

    ajax.$get(test_route, callback);
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

    ajax.$get(test_route, callback);
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

    ajax.$get(test_route, callback);
    requests[0].respond( xhr.status, xhr.header, xhr.response);

    assert.equal(true, callback.calledWith(xhr.status));
  });

});
