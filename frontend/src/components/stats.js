import React, {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import {BarChart, Bar} from 'recharts';
import {LineChart, Line} from 'recharts';
import {Form, Text} from 'react-form';
import axios from 'axios';


export default class Stats extends Component{

	constructor(props){
	  super(props);

	this.state ={
	     data : Array(5).fill(null)
	};
	
	  this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(event){
	  event.preventDefault();
	  const values = Object.keys(event.target).map((entry,index)=> event.target[entry].value);
	  const input_data = values.slice(0,4).map((entry)=> parseInt(entry));
	  axios.post('/input-form',input_data).then((res)=> res.data).then(function(res){input_data.push(res/5000); const d = input_data.slice(); this.setState({data: d})}.bind(this));
	}
	
	render(){

		console.log(this.state);
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
		
		return (<div>


				<LineChart width={600} height={300} data={data}
            				margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       				<XAxis dataKey="name"/>
       				<YAxis/>
       				<CartesianGrid strokeDasharray="3 3"/>
       				<Tooltip/>
       				<Legend />
       				<Line type="monotone" dataKey="data" stroke="#8884d8" activeDot={{r: 8}}/>
     				</LineChart>
				
				<AreaChart width = {600} height = {400} data = {data}>
				<XAxis dataKey = "name"/>
				<YAxis/>
				<Tooltip/>
				<Area type = 'monotone' dataKey = "data" />
				</AreaChart>



				<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
					<PolarGrid />
					<PolarAngleAxis dataKey="name" />
					<PolarRadiusAxis/>
					<Tooltip/>
					<Radar name="Mike" dataKey="data" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
				</RadarChart>
				
				<BarChart width={600} height={300} data={data}
        				    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    				   <XAxis dataKey="name"/>
      				   <YAxis/>
    				   <CartesianGrid strokeDasharray="3 3"/>
  			           <Tooltip/>
      			           <Legend />
                                   <Bar dataKey="data" fill="#8884d8" />
      				</BarChart>
				
			    <Form>
			      {formApi => (
				<form onSubmit = {this.onSubmit} id = "form1">			
				 <label htmlFor = "kills">kills</label>
				 <Text field = "kills" id = "kills" />
				<label htmlFor = "assists">assists</label>
                                 <Text field = "assists" id = "assists"/>
				<label htmlFor = "deaths">deaths</label>
                                 <Text field = "deaths" id = "deaths"/>
				<label htmlFor = "denies">denies</label>
                                 <Text field = "denies" id = "denies"/>
				 <button type = "submit">Submit</button>
				</form>
				)}
				</Form>
				<div> hero_damage : {parseInt(this.state.data[4]*5000)} </div>
				<RadarChart cx ={300} cy ={250} outerRadius = {150} width = {600} height = {500} data = {predict_data}>
					<PolarGrid />
					<PolarAngleAxis dataKey = "name" />
					<PolarRadiusAxis/>
					<Tooltip />
					<Radar name = "Mary" dataKey = "data" stroke = "#789a7c" fill = "#789a7c" fillOpacity = {0.4} />
				</RadarChart>
			</div>
			);

	}




}

