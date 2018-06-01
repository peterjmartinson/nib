

describe('Model', function() {
  let store = {
    test_data : '',
    setTestData: function(new_data) {
      this.test_data = new_data;
    },
    getTestData: function() {
      return this.test_data;
    },
    test_error : '',
    setTestError: function(new_error) {
      this.test_error = new_error;
    },
    getTestError: function() {
      return this.test_error;
    }
  };

  let model = new Model(store);
  
  describe('getOneNote()', function() {
    // =================================================  Setup

    store.findOneById = function(arg, callback)
    {
      let data = this.getTestData();
      let error = this.getTestError();
      callback(error, data);
    }

    // =================================================  Tests
    it('should exist', function() {
      assert.equal(typeof model.getOneNote, 'function');
    });

    it("should take a callback", function(done) {
      model.getOneNote("1000", function(error, data) {
        assert.ok(true);
        done();
      });
    });

    it('should call store.findOneById()', function(done) {
      store.setTestData('called');
      model.getOneNote('1000', function(error, data) {
        assert.equal(data, 'called');
        done()
      });
    });

  });

});
