var express = require('express');
var router = express.Router();
var fs = require('fs')
/* /get/2* - send some animal */
/* /get/by/name/value */
/* /add */


module.exports = function(app){
	router.get('/:id', function(req, res){
		//var url = "http://localhost:3000/remove?id=*page*"
		//var Id = query.replace('*page*', req.params.id)
		fs.readFile('./db.json', function (err, data){
			if(err){
				res.send({
					"success": "false", 
					"message": "No find db"
				})
			}
			var json = JSON.parse(data)
			var found =false
			var schet = 0
			for (let elem of json.posts) {
				if(elem.id == req.params.id) {
				console.log(schet)
				found = true;
				json.posts.splice(schet, 1);
				break
				}
				schet++
			}
			if(!found){
				res.send({
					"success": "false", 
					"message": "No such book id"
				})
			}
			fs.writeFile('./db.json', JSON.stringify(json), function(err){
				res.send({
					"message": "Data deleted",
					"status": "success"
				})
			});
		});
	});
	app.use('/remove', router);
};

module.exports = function(app){
	router.get('/', function(req, res){
		fs.readFile('./db.json', function (err, data){
			if(err){
				res.send({
					"success": "false", 
					"message": "No find db"
				})
			}
			var json = JSON.parse(data)

			json.posts.push({
				"id": req.params.id,
				"name": req.params.name,
				"type": req.params.type,
				"room": req.params.room
			})
			fs.writeFile('./db.json', JSON.stringify(json), function(err){
				res.send({
					"message": "Data added",
					"status": "success"
				})
			});
		});
	});
	app.use('/add', router);
};