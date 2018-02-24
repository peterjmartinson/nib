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

  it("should make a new XMLHttpRequest", function(done) {
    var original_xhr = XMLHttpRequest;
    var ran = false;
    var XMLHttpRequest = function() { ran = true; };
    console.log(XMLHttpRequest);

    window.handler.$get("", console.log);
    assert.equal(ran, true);
    done();
  });

});
