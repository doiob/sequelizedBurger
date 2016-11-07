/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models')
 
var moment = require('moment');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

var hbsObject;
router.get('/burgers', function (req, res) {
	models.burgers.findAll({
  attributes: ['id','burger_name', 'devoured']
})
.then (function(data){
	var ary=[];
	
	 data.forEach(function(row){return ary.push(row.get())})
	console.log(ary)
	var hbsObject = { burgers: data };
		res.render('index',hbsObject );
	})
})	

router.post('/burgers/create', function (req, res) {
	var d = moment().format('YYYY-MM-DD')
	models.burgers.create({'burger_name':req.body.burger_name, 'devoured':false,'day':d}).then(function() {})
	res.redirect('/burgers');
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	models.burgers.update({ devoured: req.body.devoured },{ where :{id:req.params.id}}, function () {});
	res.redirect('/burgers');
});

module.exports = router;
