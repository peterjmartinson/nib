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

  before (function() {
    let original_xhr = new XMLHttpRequest(); // not a constructor?
    console.log(original_xhr);
    let ran = false;
    XMLHttpRequest = function() {
      ran = true;
      return {
        verb: '',
        route: '',
        open: function(verb, route) {
          this.verb = verb;
          this.route = route;
        },
        send: function() { return false; },
        readyState: 4,
        status: 200,
        responseText: "Test response text",
        onreadystatechange: null
      };
    };
    console.log(XMLHttpRequest);
  });

  it("should make a new XMLHttpRequest", function(done) {

    window.handler.$get("route", function(response) {
      console.log(response);
      assert.equal(1,2);
      assert.equal(response, "Tests response text");
      done();
    });
    // console.log(XMLHttpRequest.verb);
    // assert.equal(ran, true);
    // assert.equal(XMLHttpRequest.verb, "GET");
    // done();
  });

});

var xhr, requests;

describe("$get, take two", function() {
 
  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
  });

  after(function () {
    xhr.restore();
  });

  it("makes a GET request for todo items", function () {
    let callback = sinon.spy();
    window.handler.$get("butts", callback);

    // assert.equal(callback.called, true);
    
    
    
    // getTodos(42, sinon.spy());

    console.log("requests: " + JSON.stringify(requests.status));
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, "butts");
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

// this.requests[0].respond(200, { "Content-Type": "application/json" }, '[{ "id": 12, "comment": "Hey there" }]');
