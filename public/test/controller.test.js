let ctrl = new Controller();

describe('editExistingNote()', function() {
  it('should exist', function() {
    assert.equal(typeof ctrl.editExistingNote, 'function');
  });

  it("should take a callback", function(done) {
    ctrl.editExistingNote("1000", function(error, data) {
      assert.ok(true);
      done();
    });
  });

  it('should call model.getOneNote()', function() {
  });

});
