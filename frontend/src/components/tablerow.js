import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';


export default class Tablerow extends Component {
	constructor(props){
		super(props)
		this.state = {
			edit: false,
			'id': this.props.data['account_id'],
			'gpm': this.props.data['gold_per_min'],
			'hdm': this.props.data['hero_damage'],
			'stuns': this.props.data['stuns'],
			'xpm': this.props.data['xp_per_min']
		}

	
	this.handleToggle = this.handleToggle.bind(this);
	this.handleEdit = this.handleEdit.bind(this);
	this.handleChange = this.handleChange.bind(this);
	}


	handleToggle(e){
		console.log(this.props.data);
		e.preventDefault();
		console.log('start editing');
		if (this.state.edit == false)
			this.setState({edit: true});
		else
			this.setState({edit: false});
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		this.setState({id: nextProps.data['account_id'], gpm: nextProps.data['gold_per_min'], hdm: nextProps.data['hero_damage'], stuns: nextProps.data['stuns'], xpm: nextProps.data['xp_per_min']});
	}

	handleEdit(e){
		var in_ = prompt('please enter the passcode');
		var count = 0;
		while (in_ != '1330'){
			in_ = prompt('plase enter the passcode');
			count ++;
			if (count > 5) return;

		}
		e.preventDefault();
		console.log(this.state);
		console.log('finish edit');
		this.setState({edit: false});
		var obj = {'account_id': this.state.id, 'gold_per_min' : this.state.gpm, 'stuns' : this.state.stuns, 'xp_per_min': this.state.xpm, 'hero_damage': this.state.hdm, 'pid': this.props.data['account_id'], 'gpm' : this.props.data['gold_per_min'], 'hdm' : this.props.data['hero_damage'], 'stu': this.props.data['stuns'], 'xpm': this.props.data['xp_per_min']};
		console.log(obj);

		axios.post('/userUpdate', obj).then(res => console.log(res));
	
	}
		
	handleChange(e){
		e.preventDefault();
		console.log(typeof(e.target.name));
		console.log(typeof(e.target.value));
		const name = e.target.name;
		const val = e.target.value;
		let newState = {};
		newState[name] = val; 
		this.setState(newState);
	}


	render(){
		console.log(this.state.id);
		console.log(this.state.gpm);
		const rowTable = (
				<tr>
				<td>{this.state.id == undefined? -1: this.state.id}</td>
				<td>{this.state.gpm == undefined? -1:parseFloat(this.state.gpm).toFixed(1)}</td>
				<td>{this.state.hdm == undefined? -1:parseFloat(this.state.hdm).toFixed(1)}</td>
				<td>{this.state.stuns == undefined? -1:parseFloat(this.state.stuns).toFixed(1)}</td>
				<td>{this.state.xpm == undefined? -1:parseFloat(this.state.xpm).toFixed(1)}</td>
				<td>{1}</td>
				<td><button onClick = {this.handleToggle}>Edit</button></td>
			     	</tr>
			    );

		const rowForm = (
				
				
				<tr>
				<td><input type = 'text'  placeholder  = {this.props.data['account_id']} onChange = {this.handleChange} name = 'id' /></td>
				<td><input type = 'text' placeholder = {this.props.data['gold_per_min']} onChange = {this.handleChange} name = 'gpm' /></td>
				<td><input type = 'text' placeholder = {this.props.data['hero_damage']} onChange = {this.handleChange}  name = 'hdm' /></td>
				<td><input type = 'text' placeholder = {this.props.data['stuns']} onChange = {this.handleChange}  name = 'stuns' /></td>
				<td><input type = 'text' placeholder = {this.props.data['xp_per_min']} onChange = {this.handleChange}  name = 'xpm' /></td>
				<td><input type = 'text'  placeholder = 'nimama' /></td>
				<td><input type = 'submit' onClick = {this.handleToggle} value = 'Cancel' /></td>
				<td><input type = 'submit' onClick = {this.handleEdit} value = 'Update' /></td>
				</tr>	
				
		            );

		const cur = this.state.edit == false?rowTable:rowForm;
		return (
			cur
		);


		}


	}
