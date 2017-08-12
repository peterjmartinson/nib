'use strict';

/* ============================ SETUP ============================ */

const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      PORT          = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ============================ ROUTES ============================ */

app.use(express.static(__dirname + '/main'));     //for landing page

app.get('/',function(req, res){
	res.sendFile(__dirname + '/main');
});


/* =========================== RUN APP =========================== */

app.listen(PORT, function (){
	console.log('Server is listening to %d port in %s mode',PORT,app.settings.env);
});

