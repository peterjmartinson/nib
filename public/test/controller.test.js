
describe('Controller', function() {
  let model = {
    test_data : '',
    setTestData: function(new_data) {
      this.test_data = new_data;
    },
    getTestData: function() {
      return this.test_data;
    },
  };

  let view = {};

  let ctrl = new Controller(model, view);

  describe('editExistingNote()', function() {

    // =================================================  Setup

    model.getOneNote = function(arg, callback)
    {
      let data = this.getTestData();
      callback(null, data);
    }

    // =================================================  Tests
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
      let test_data = 'called'
      model.setTestData(test_data);
      ctrl.editExistingNote("1000", function(error, data) {
        assert.equal(data, test_data);
        done();
      });
    });
    
      


  

  });

});
