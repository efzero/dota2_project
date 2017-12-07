import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import {BarChart, Bar} from 'recharts';
import {LineChart, Line} from 'recharts';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Tablerow from './tablerow.js';
import './header.css';




import {Bootstrap, Grid, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';





export default class Stats extends Component{

	constructor(props){
	  super(props);

	this.state ={
	     data : Array(5).fill(null),
	     players: -1
	};
	
	  this.onSubmit = this.onSubmit.bind(this);
	  this.CompareData = this.CompareData.bind(this);
	}
	
	onSubmit(event){
	  event.preventDefault();
	  const values = Object.keys(event.target).map((entry,index)=> event.target[entry].value);
	  const input_data = values.slice(0,4).map((entry)=> parseInt(entry));
	  axios.post('/input-form',input_data).then((res)=> res.data).then(function(res){input_data.push(res/5000); const d = input_data.slice(); this.setState({data: d})}.bind(this));
	}

	CompareData(event){

	  event.preventDefault();
	  const values = Object.keys(event.target).map((entry,index)=>event.target[entry].value);
	  console.log(values);	
	  const input_data = values.slice(0,4).map((entry)=>parseInt(entry));

	  axios.post('/teammate', input_data).then((res)=> this.setState({players: res.data}));

	}

	

	
	render(){
		//const cur_players = JSON.parse(this.state.players);
		let Table; 
		if (this.state.players != -1 && this.state.players != 'error'){
			console.log(this.state.players);
			let cur_players = this.state.players.slice();
			//const cur_players = JSON.parse(this.state.players);
			Table = cur_players.map((entry,index) => <tr className = 'ser' key = {index}> {entry.map((e,i) => <td className = 'sdf' key = {i}>{e}</td>)} </tr> )
			console.log(Table);
			//console.log(cur_players[0]);
		}
		const matches = this.props.matches;
		const times = matches.map((entry, index) => entry['duration']);
		let durations = [0,0,0,0,0]
		for (let i = 0; i < times.length; i++){
			if (times[i] >= 1200 && times[i] < 1800)
				durations[0] ++;
			else if (times[i] >= 1800 && times[i] < 2400)
				durations[1] ++;
			else if (times[i] >= 2400 && times[i] < 3000)
				durations[2] ++;
			else if (times[i] >=3000 && times[i] < 3600)
				durations[3] ++;
			else if (times[i] >= 3600)
				durations[4] ++;
		}	
		const data = durations.map((entry, index) => Object.assign({"name": String(index*10+20)+"minutes", "data": entry}));
		const titles = ['kills','assists','deaths','denies', 'hero_damage'];
		const predict_data = this.state.data.map((entry, index) => Object.assign({"name":titles[index], "data": entry}));
	//	const data = durations.map(function (entry, index) {const str = String(index*10+20); const obj = Object.assign({"name": str, "data": entry}); return obj;});
		
		return (<div className = 'col'>
				
				
				<div className = 'title'> The two charts below show the distribution of game times among all games </div>
			
				<div className = 'col1'>
	
			<RadarChart cx={450} cy={125} outerRadius={100} width={550} height={350} data={data}>
					<PolarGrid />
					<PolarAngleAxis dataKey="name" />
					<PolarRadiusAxis/>
					<Tooltip/>
					<Radar name="Mike" dataKey="data" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
				</RadarChart>
				</div>

				<div className = 'col2'>
				<BarChart width={300} height={300} data={data}>
    				   <XAxis dataKey="name"/>
      				   <YAxis/>
    				   <CartesianGrid strokeDasharray="3 3"/>
  			           <Tooltip/>
      			           <Legend />
                                   <Bar dataKey="data" fill="#8884d8" />
      				</BarChart>
				</div>



				<Form onSubmit = {this.onSubmit} id = "form1">
				    <input type = 'text' placeholder = 'kills' name ='kills'></input>			
				    <input type = 'text' placeholder = 'deaths' name = 'deaths'></input>
				    <input type = 'text' placeholder = 'assists' name = 'assists'></input>
				    <input type = 'text' placeholder = 'denies' name = 'denies'></input>                                 
				 <Button bsStyle = 'primary'  type = "submit">Submit</Button>
				</Form>
				<div> hero_damage : {parseInt(this.state.data[4]*5000)} </div>
				<RadarChart cx ={300} cy ={250} outerRadius = {150} width = {600} height = {500} data = {predict_data}>
					<PolarGrid />
					<PolarAngleAxis dataKey = "name" />
					<PolarRadiusAxis/>
					<Tooltip />
					<Radar name = "Mary" dataKey = "data" stroke = "#789a7c" fill = "#789a7c" fillOpacity = {0.4} />
				</RadarChart>
            			
                                	<Form inline  onSubmit = {this.CompareData} id = "form1">
						<input type = 'text' placeholder = 'wins' name = 'win'></input>
                                 		<input type = 'text' placeholder = 'matches' name = 'matches'></input>

						<input type = 'text' placeholder = 'trueskill average' name = 'trueskill'></input>
                                	
						<input type = 'text' placeholder = 'trueskill standard deviation' name = 'trueskillstd'></input>
                                 	<Button bsStyle = 'primary'  type = "submit">Submit</Button>
                                	</Form>
                                


				<table>
					<tr>
						<th>account ID</th>
						<th>total wins</th>
						<th>total matches</th>
						<th>trueskill average</th>
						<th>trueskill standard deviation</th>
					</tr>
					{Table}

					
				</table>
				






			</div>
			);

	}




}

