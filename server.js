/*
Here is where you set up your server file.
express middleware.
*/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Sequelize = require("sequelize");
var app = express();
var models = require('./models')
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
// SOLUTION: bring in our Sequelize models object



// SOLUTION: Sync our models
models.sequelize.sync({force:true}) // {force:true} drops the table everytime the server starts.

// Solution: Create our Manager in a .then callback
// ================================================
.then(function(){

	return models.burgers.create({
		burger_name :"Cheese Burger",
		devoured: "false"
	})
})
.then(function(){

	return models.burgers.create({
		burger_name :"Veggie Burger",
		devoured: "false"
	})
})
.then(function(){

	return models.burgers.create({
		burger_name :"Chicken Burger",
		devoured: "false"
	})
})

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var port = 3000;
app.listen(port);
