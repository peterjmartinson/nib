(function() {
  'use strict';

  const express    = require('express'),
        app        = express(),
        port       = process.env.PORT || 3000,
        bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logError);

  function logError(err, req, res, next) {
    console.log('Error: ', err.stack);
    res.status(500).send('Something broke...');
  }

  app.use(express.static(__dirname + '/public'));

  app.listen(port, function (){
    console.log('Server is listening to %d port in %s mode',port,app.settings.env);
  });


}())
