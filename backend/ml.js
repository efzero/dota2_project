
var LinearRegression = require('shaman').LinearRegression;


var ml = require('machine_learning')

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '11111111',
	database :'dota2'

});


var str = ""; 

var run_regression = function (input, x, y){

			var lr = new LinearRegression(x, y, {
				algorithm: 'GradientDescent',
				numberOfIteration: 1000,
				learning: 0.5
				});

			lr.train(function(err){
				console.log(lr.costs);
			});

			return lr;
			
			//svm.train({C: 1.0, tol: 1e-5, kernel: {type :'polynomial', c:1, d:5}});			//});

}

var knn = function(input){

		return 0;
	}


var methods = {run_regression, knn}


module.exports = methods;



/*
var data = [[1,0,1,0,1,1,1,0,0,0,0,0,1,0],
            [1,1,1,1,1,1,1,0,0,0,0,0,1,0],
            [1,1,1,0,1,1,1,0,1,0,0,0,1,0],
            [1,0,1,1,1,1,1,1,0,0,0,0,1,0],
            [1,1,1,1,1,1,1,0,0,0,0,0,1,1],
            [0,0,1,0,0,1,0,0,1,0,1,1,1,0],
            [0,0,0,0,0,0,1,1,1,0,1,1,1,0],
            [0,0,0,0,0,1,1,1,0,1,0,1,1,0],
            [0,0,1,0,1,0,1,1,1,1,0,1,1,1],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            [1,0,1,0,0,1,1,1,1,1,0,0,1,0]
           ];

var result = [23,12,23,23,45,70,123,73,146,158,64];


var knn = new ml.KNN({
    data : data,
    result : result
});


var y = knn.predict({
    x : [0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    k : 10,
 
    weightf : {type : 'gaussian', sigma : 10.0},distance : {type : 'euclidean'}});


console.log(y);
*/


