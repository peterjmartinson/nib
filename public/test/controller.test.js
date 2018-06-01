(function() {

let ctrl = new Controller();
let model = {};
model.getOneNote = function(arg, callback)
{
  let data = "called";
  callback(null, data);
}

describe('editExistingNote()', function() {
  before(function() {
  });

  after(function() {
  });

  it('should exist', function() {
    assert.equal(typeof ctrl.editExistingNote, 'function');
  });

  it("should take a callback", function(done) {
    ctrl.editExistingNote("1000", function(error, data) {
      assert.ok(true);
      done();
    });
  });

  it('should call model.getOneNote()', function(done) {
    let ran = false;

    ctrl.editExistingNote("1000", function(error, data) {
      assert.equal(data, "called");
      done();
    });
      
  });

});

})();
