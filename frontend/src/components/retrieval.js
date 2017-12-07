import React, { Component } from 'react';
/*import {Pagination} from 'react-boostrap';*/
import './header.css';
import axios from 'axios';
import Tablerow from './tablerow.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import {Bootstrap, Grid, Row, Col, Button, ButtonToolbar,Form,  FormGroup, FormControl, ControlLabel} from 'react-bootstrap';



export default class Retrieval extends React.Component{

   constructor(props){
	super(props);
        this.state = {
		players: this.props.players,
		displayinsert: 0,
		displayDelete: 0,
		displayUpdate:0,
		showNew: 'no'
	}

		this.back = this.back.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInsert = this.handleInsert.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClick1 = this.handleClick1.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleUpdate=this.handleUpdate.bind(this);
		this.handleClick2=this.handleClick2.bind(this);
		this.handleJump = this.handleJump.bind(this);

	}


	handleJump(ev){
		ev.preventDefault();
		console.log(ev.target.jumping.value);
		const id = String(ev.target.jumping.value);
		if (isNaN(parseFloat(id)) == false){
			const str = '/pageinate/' + id;
			fetch(str).then(res => res.json()).then(res => this.setState({players: res})).catch(function(err){console.log(err)});}
	}


	handleSubmit(ev){
		ev.preventDefault();
		console.log('dashabi');
		console.log(ev.target.userid.value);
		const id = String(ev.target.userid.value);
		if (id != ''){
			const str = '/user/' + id;
			fetch(str).then(res=> res.json()).then(res => this.setState({players: res})).catch(function(err){console.log(err)});
		}
		else{

			this.setState({players: this.props.players});

		}
	}



	handleClick(e){
		e.preventDefault();
		var k = 0;
		var count = 0
		while (k != 1330){
			k = prompt('please enter the passcode');
			count ++;
			if (count > 5) return;
		}

		console.log('clicking');
		this.setState({displayinsert: 1});
	}
       handleClick2(e){
                e.preventDefault();
                var k = 0;
                var count = 0
                while (k != 1330){
                        k = prompt('please enter the passcode :)');
                        count ++;
                        if (count > 5) return;
                }

                console.log('clicking');
                this.setState({displayUpdate: 1});
        }



	handleClick1(e){
		e.preventDefault();
		var count=0;
		var k=0;
		while(k!=1330){
			k=prompt('pls enter the passcode');
			count++;
			if(count>5) return;
	}	
	this.setState({displayDelete: 1});
	
}	
	back(e){

		this.setState({players: this.props.players,displayDelete:0, displayinsert:0, showNew:'no'});

}
	
	handleInsert(ev){
		ev.preventDefault();

		console.log(ev.target.id.value);
		console.log(ev.target.gpm.value);

		const info = {a:2, b:1};
		const data = {'id': ev.target.id.value, 'GPM': ev.target.gpm.value, 'XPM': ev.target.xpm.value, 'KDA': ev.target.kda.value}

		axios.post('/insert', data).then(res => res.data).then(res => this.setState({showNew: 'nimama', displayDelete: 0, displayinsert:0,displayupdate:0})).then(setTimeout(function(){ fetch('/newuser').then(response => response.json()).then(response => this.setState({players: response}))}.bind(this), 1000));	

	/*fetch('/insert', {
			method: 'POST',
			headers: {
    				'Accept': 'application/json',
   				 'Content-Type': 'application/json'
 			 },
			body: JSON.stringiafy(info)  
				}).then(res=>res.json()).then(res =>console.log(res));
		*/
		}

	handleUpdate(ev){
		ev.preventDefault();
		const data={'id':ev.target.id.value};
		axios.post('/update',data).then(res=>res.data).then(res=>this.setState({showNew:'nijiejie',displayDelete:0,displayinsert:0,displayupdate:0})).then(setTimeout(function(){ fetch('/newuser').then(response => response.json()).then(response => this.setState({players: response}))}.bind(this), 1000));
}

	handleDelete(ev){
		ev.preventDefault();
		console.log(ev.target.id.value);	
		const data = {'id':ev.target.id.value};
		axios.post('/delete',data).then(res=>res.data).then(res => this.setState({showNew:res, displayDelete:0, displayinsert: 0,displayupdate:0})).then(setTimeout(() => fetch('/newuser').then(res => res.json()).then(res => this.setState({players: res})), 1000));

	}

	handleChange(ev){
		ev.preventDefault();
		fetch('/newuser').then(res =>res.json()).then(res => this.setState({players: res})).catch(function(err){console.log(err)});	
	
	}



    render(){


	const newplayer = this.state.players.map((row, index) => <Tablerow key = {index} data = {row}/>);
	/*const playerdata = this.state.players.map((row, index) => 
		<tr key = {index}>
			<td>{row['account_id']}</td>
			<td>{row['gold_per_min'] == undefined?-9999:parseFloat(row['gold_per_min']).toFixed(1)}</td>
			<td>{row['hero_damage'] ==
undefined?-9999:parseFloat(row['hero_damage']).toFixed(1)}</td>
			<td>{row['stuns'] == undefined?-9999:parseFloat(row['stuns']).toFixed(1)}</td>
			<td>{row['xp_per_min'] == undefined?-9999:parseFloat(row['xp_per_min']).toFixed(1)}</td>
			<td>{1}</td>
			<td><button onClick = {this.UpdateInline}>Update</button>
			    <button onClick = {this.DeleteInline}>Delete</button></td>
		</tr>

	);*/
	/*<Pagination className = "users-pagination pull-right" bsSize = "medium"
		maxButtons ={100} first last next prev bounarLinks 
		items = {}>*/
	console.log(this.state.players);

	const newtbl = <div> Succeeded in inserting a new value! <Button onClick = {this.handleChange}>Show the new table</Button></div>;
	const newtbl1=<div> Succeed in deleting a value!</div>;
	const newtable = this.state.showNew == 'nimama'? newtbl: <div></div>;
	const newtable1=this.state.showNew=='nibaba'?newtbl1:<div></div>;
	const newtbl2=<div> Succeed in updating!</div>;
	const newtable2=this.state.showNew=='nijiejie'?newtbl2:<div></div>;

	const showhide = this.state.displayinsert == 1? {display: "flex"}: {display: "None"};
	console.log(this.state.showNew);
	
	const showhide1= this.state.displayDelete ==1? {display:"flex"}:{display:"None"};
	const showhide2=this.state.displayUpdate==1? {display:"flex"}:{display:"None"};
        return (
	    <div>
		<div className = 'wrapper'>
		<ButtonToolbar>
		 <Button  onClick = {this.back}>Back to the beginnning </Button>
		 <Button  onClick = {this.handleClick}>Insert into the database</Button>
		 <Button bsStyle = "danger" onClick= {this.handleClick1}>Delete from the database</Button>
		 <Button  bsStyle = "primary" onClick= {this.handleClick2}>Update from the database</Button>
           	

		</ButtonToolbar>
		</div>
		<br/>
		<Form inline onSubmit = {this.handleSubmit}>
			<FormGroup controlId = "formControlsText">	
                	<FormControl type = 'text' placeholder = 'Enter the accountID' name = 'userid'/>
          		</FormGroup>
			<Button type = 'submit'>Search</Button>
			
            	</Form>
		<br/>
		{newtable}
		<form inline onSubmit = {this.handleInsert}  style = {showhide}>
				
			<input type = 'text' placeholder = 'accountID' name = 'id'></input>
			<input type = 'text' placeholder = 'gpm' name = 'gpm'></input>
			<input type = 'text' placeholder = 'xpm' name = 'xpm'></input>
			<input type = 'text' placeholder = 'kda' name = 'kda'></input>
			<Button type = 'submit'>Insert</Button>
		</form>
		<form onSubmit={this.handleDelete} style={showhide1}>
			<input type='text' placeholder='accountID' name ='id'></input>
			<input type = 'submit' value = 'Delete'></input>

		</form>
		{newtable1}
		<form onSubmit={this.handleUpdate} style={showhide2}>
			<input type='text' placeholder='gpm' name ='id'></input>
			<input type='submit' value='Update'></input>
		</form>
		{newtable2}
		<table className = 'tbl'>
			<thead>
				<tr>
					<th className = "text-center">Player ID</th>
					<th className = "text-center">GPM </th>
					<th className = "text-center"> Accumulated Kills </th>
					<th className = "text-center"> KDA </th>
					<th className = "text-center"> XPM </th>
					<th className = "text-center"> KIll+Assist </th>
					<th className = "text-center">Action</th>
				</tr>
			</thead>
			<tbody>
				{newplayer}
			</tbody>
		</table>

		<br/>
		<Form inline onSubmit = {this.handleJump}>
			<FormGroup>
				<ControlLabel>Jump to Page</ControlLabel>
			<FormControl type = "text" placeholder = "1" name = "jumping" />
			
			<Button type = "submit">
				Go
			</Button>
			</FormGroup>
		</Form>
		<br/>
 	    </div>

        )
    }
}

