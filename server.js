(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = process.env.PORT || 3000,
        MongoClient = require('mongodb').MongoClient,
        assert = require('assert'),
        bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logError);

  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.use(express.static(__dirname + '/public'));

  MongoClient.connect('mongodb://localhost:27017/nib', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");
    app.post('/', function(req, res) {
      console.log("You just tried to post, Sucker!");
      console.log(req.body.thenote);

      db.collection("notes").insertOne({
        created_date : new Date(),
        note_text : req.body.thenote
      });
      res.redirect('/');

    });

    app.listen(port, function (){
      console.log('Server is listening to %d port in %s mode',port,app.settings.env);
    });

  });

}())
