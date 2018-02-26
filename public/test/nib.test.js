// const assert = window.assert;
const assert = chai.assert;


describe("The canary", function() {
  it("should tweet", function() {
    assert.equal(1, 1);
  });
});

describe("$get", function() {
  it("should exist", function() {
    let spy = sinon.spy();
    assert.equal(typeof window.handler.$get, "function");
  });

  let xhr, requests;

  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  after(function () {
    xhr.restore();
  });

  it("makes a GET request", function () {
    let callback = sinon.spy();
    let test_route = "Alligator Scales";
    let test_id = "1000",
        test_date = "2017-12-30T20:28:32.477Z",
        test_note_text = "Crocodile Tears";
    window.handler.$get(test_route, callback);

    requests[0].respond(
      200,
      { "Content-Type": "application/json; charset=utf-8" },
      '{ "_id":' + test_id + ', "created_date":' + test_date + ', "note_text":' + test_note_text + '}'
    );
    console.log("requests: " + JSON.stringify(requests));
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, test_route);
    assert.equal(true, callback.called);
  });

});




// response header:
// HTTP/1.1 200 OK
// X-Powered-By: Express
// Content-Type: application/json; charset=utf-8
// Content-Length: 100
// ETag: W/"64-P8aWgbindDbqJVEKr71hidCTO+M"
// Date: Mon, 26 Feb 2018 00:33:48 GMT
// Connection: keep-alive
// { "_id": "5a47f6f0e1dad547899ea2ee", "created_date": "2017-12-30T20:28:32.477Z", "note_text": "rockwell" }

// this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "id": 12, "comment": "Hey there" }]');
