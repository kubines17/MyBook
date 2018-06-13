var express = require('express');
var router = express.Router();
var fs = require('fs')
/* /get/2* - send some animal */
/* /get/by/name/value */
/* /add */


module.exports = function(app){
	router.get('/:id', function(req, res){
		fs.readFile('./zoo.json', function (err, data){
			if(err){
				res.send({
					"message": "Can not read file",
					"Ststus": "fail"
				})
			}
			var json = JSON.parse(data)
			var found =false
			for (let elem of json) {
				if(elem.id == req.params.id) {
					found = true
					elem.status = "fail"
					res.send(elem)
				}
			}
			if(!found){
				res.send({
					"message": "No such id",
					"Ststus": "fail"
				})
			}
		});
	});
	app.use('/find', router);
};
