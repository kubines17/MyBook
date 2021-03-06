var express = require('express');
var router = express.Router();
var fs = require('fs')
/* /get/2* - send some animal */
/* /get/by/name/value */
/* /add */


module.exports = function(app){
	router.get('/:id', function(req, res){
		fs.readFile('./db.json', function (err, data){
			if(err){
				res.send({
					"success": "false", 
					"message": "No find db"
				})
			}
			var json = JSON.parse(data)
			var found =false
			for (let elem of json.posts) {
				if(elem.id == req.params.id) {
					found = true
					res.send(elem)
				}
			}
			if(!found){
				res.send({
					"success": "false", 
					"message": "No such book id"
				})
			}
		});
	});
	app.use('/get/book', router);
};

module.exports = function(app){
	router.get('/all', function(req, res){
		fs.readFile('./db.json', function (err, data){
			if(err){
				res.send({
					"success": "false", 
					"message": "No find db"
				})
			}
			var json = JSON.parse(data)
			var found =false
			for (let elem of json.posts) {
				if(elem.id != null) {
					found = true
					res.send(json.posts)
					break
				}
			}
			if(!found){
				res.send({
					"success": "false", 
					"message": "No books in database"
				})
			}
		});
	});
	app.use('/get', router);
};