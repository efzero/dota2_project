var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ml = require('./ml.js');
var spawn = require('child_process').spawn;
var fs = require('fs');





var mysql = require('mysql');


var str = ""; 
var str2 = "";
var str3 = "";

var con;


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());


function handleDisconnect(){
	con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '11111111',
        database :'dota2'

});

	


	con.connect(function(err){
		if (err){
			console.log('error connecting to db');
			setTimeout(handleDisconnect, 2000);
		}

	});

		con.on('error', function(err){

			handleDisconnect();

	});

	
	con.query("SELECT * FROM players", function(err, result, fields){
			str = result;
			});
	con.query("SELECT DISTINCT (account_id), AVG(gold_per_min) as gold_per_min, AVG(xp_per_min) as xp_per_min, AVG(hero_damage) as hero_damage, AVG(stuns) as stuns FROM player GROUP BY account_id limit 100", function(err, result2, fields){
			str2= result2;

			});
	con.query("SELECT match_id, duration, game_mode, radiant_win, positive_votes FROM matches limit 100", function(err, result3, fields){
			str3 = result3;
			});	
}

handleDisconnect();


app.get('/users', function(req, res){
	console.log('iget');
	console.log(str);
	res.setHeader('Connection', 'keep-alive');
	res.send(str);
});

app.get('/players', function(req, res){
        console.log('iget');
	console.log(str2);
        res.setHeader('Connection', 'keep-alive');
        res.send(str2);

});


app.get('/user/:userID', function(req, res){
	console.log('nihaoma');
	var target = String(req.params.userID) + " limit 50";
	var result = "";

	var query =  "SELECT account_id, gold_per_min as gold_per_min, xp_per_min as xp_per_min, hero_damage as hero_damage, stuns as stuns FROM player WHERE account_id = " + target;
        var q = 'SELECT stuns FROM player WHERE account_id = 100';
	con.query(query, function(err, result4, fields){
            result= result4;
	    res.send(result);

        });

})



//run_regression([10,10,2,10]);



app.get('/newuser', function(req, res){

	var query = "SELECT account_id, gold_per_min, xp_per_min, kda FROM userPlayer limit 100";
	var result = "";
	
	con.query(query, function(err, result4, fields){
		result = result4;
		console.log(result);
		res.send(result);

	});

})


app.post('/insert', function(req, res){
	res.setHeader('Connection','keep-alive');
	console.log(req.body);
	var query = "INSERT INTO userPlayer(account_id, gold_per_min, xp_per_min, kda) VALUES";
	var query2 = "INSERT INTO player(account_id, gold_per_min, xp_per_min, hero_damage) VALUES";
	var infos = []

	var err = false;


	for (i in req.body){
		if (isNaN(parseFloat(req.body[i])) == true){
			err= true
			break;
		}
		else
			infos.push(req.body[i]);
	}	

	if (!err){
		var q = infos.join(',');
		var target = "( " + q + " )"
		query = query + target;
		query2 = query2 + target;
		console.log(query);
		con.query(query, function(err, result4, fields){
			con.query(query2, function(err5, result5, fields5){
				console.log('want to know result5');
				console.log(result5);
				res.send("nimama");
			});
		//console.log(result4);
		//res.send('nimama');	
		});
	}
	else
		res.send('error in input');

});

app.post('/update',function(req,res){
	var query="UPDATE userPlayer SET gold_per_min= ";
	var err=false;
	var infos=[];
	for (i in req.body){
                if (isNaN(parseFloat(req.body[i])) == true){
                        err= true
                        break;
                }
                else
                        infos.push(req.body[i]);
        }
	if(!err){
		var q=infos;
		var target=infos;
		query=query+target;
		con.query(query,function(err,result4,fields){
		res.send('nijiejie');
		})
	}
	else
		res.send('error in input');
});


app.post('/userUpdate', function(req, res){
	var firstq = 'UPDATE player SET gold_per_min = ' + req.body['gold_per_min'] + ', account_id = ' +  req.body['account_id'] + ', hero_damage = ' + req.body['hero_damage']+ ', stuns = ' + req.body['stuns'] + ', xp_per_min = ' + req.body['xp_per_min'];
	var secondq = ' WHERE gold_per_min = ' + req.body['gpm'] + ' AND account_id = ' + req.body['pid'] + ' AND xp_per_min =' + req.body['xpm'] + ' AND stuns = ' +req.body['stu'];

	var err = false;

//	console.log(firstq + secondq);
	var query = firstq + secondq;
	console.log(query);
	for (i in req.body){
		if (isNaN(parseFloat(req.body[i])) == true){
			err = true;
			break
		}

	}	

	if (!err || err){
		con.query(query, function(err, result4, fields){
			console.log(result4);
			console.log('suceess');
			res.send('sucess');

		})
	}
	else
		res.send('error in input');


});

app.post('/delete', function(req,res){


	var query="DELETE from userPlayer WHERE account_id=" ;
	var err=false;
	var infos=[];
	for(i in req.body){
		if(isNaN(parseFloat(req.body[i]))==true){
			err=true
			break;
		}
		else continue;

	}
	if( !err){
		var q=infos;
		var target=q;
		query=query+target;
		console.log(q);
		con.query(query,function(err,result4,fields){
		console.log(result4);
		res.send('nibaba');
		});
	}
	else 
		res.send('error in input');
});



app.get('/matches', function(req, res){
        res.setHeader('Connection', 'keep-alive');
        res.send(str3);

});

var matrix;
var y;

app.post('/input-form', function(req, res){




        
	con.query("SELECT * FROM player limit 100", function(err, result, fields){
                        str = result
                        console.log(str.length);
                        var createMatrix = function(a){
                                return [a.kills, a.assists, a.denies, a.deaths];

                        }
                        var createLabel = function(a){
                                return [a.hero_damage];
                        }


                        matrix = result.slice(1).map(createMatrix);
                        y = result.slice(1).map(createLabel);

			var output = ml.run_regression(req.body, matrix, y);
			console.log(output);
			res.send(''+output);
			});
});





app.post('/quick_query', function(req, res){
	console.log(req.body);

	console.log(matrix);
	console.log(y);


});



app.post('/teammate', function(req,res){
	if (!fs.existsSync('knn_model.sav')){

	con.query("SELECT * FROM player_ratings limit 100000", function(err, result, fields){
		
		var py = spawn('python3',['-u', 'knn.py']);
		
		var create_Matrix = function(a){
			return [a['account_id'], a['total_wins'], a['total_matches'], a['trueskill_mu'], a['trueskill_sigma']]
		}
		var id = [-1]
		var query = id.concat(req.body);

		
		matrix = result.map(create_Matrix);
		y = matrix.slice()
		y.push(query)
		py.stdin.write(JSON.stringify(y));
		py.stdin.end();
		var dataString = '';

		py.stdout.on('data', function(data){
        		dataString += data.toString();
        		console.log("has red");
        		console.log(dataString);
  		});
	
		py.stdout.on('end', function(data){
			console.log(dataString);
			console.log('ending');
			res.send(dataString);
		});
	});
	}

	else{
		var py = spawn('python3',['-u', 'knn.py']);

                var create_Matrix = function(a){
                        return [a['account_id'], a['total_wins'], a['total_matches'], a['trueskill_mu'], a['trueskill_sigma']]
                }
                var id = [-1]
                var query = id.concat(req.body);
		
                py.stdin.write(JSON.stringify(query));
                py.stdin.end();
                var dataString = '';

                py.stdout.on('data', function(data){
                        dataString += data.toString();
                        console.log("has red");
                        console.log(dataString);
                });

                py.stdout.on('end', function(data){
                        console.log(dataString);
                        console.log('ending');
			con.query('SELECT * FROM player_ratings WHERE indices IN (' + dataString + ')', function(err, result, fields){
				console.log(result);
	
				var final_result = result.map(create_Matrix);
				console.log(final_result);
                        	res.send(final_result);
			});
                });

	}

});








app.listen(8080,  function(){
	console.log('listening on 8080!')
});

