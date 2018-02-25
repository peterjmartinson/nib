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
