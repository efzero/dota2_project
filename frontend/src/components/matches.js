import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './header.css';
import axios from 'axios';


export default class Matches extends React.Component{



   constructor(props){
        super(props);
        this.state = {
                matches: this.props.matches,
		insertion: ''
        }


	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleInsert = this.handleInsert.bind(this);
	this.returnToBeginning = this.returnToBeginning.bind(this);
}


  handleSubmit(ev){
	ev.preventDefault();
	console.log(ev.target.userid.value);
	const id = String(ev.target.userid.value);
	if (id != ''){
		const str_ = '/matches/' + id;
		fetch(str_).then(res => res.json()).then(res => this.setState({matches: res[0]})).catch(function(err){console.log(err)});

	}

}


   handleInsert(ev){
	ev.preventDefault();
	console.log(ev.target.id.value);

	const data = {'id': ev.target.id.value, 'duration': ev.target.duration.value, 'mode': ev.target.game_mode.value, 'vote': ev.target.votes.value, 'wins': ev.target.win.value}

	axios.post('/insert-match', data).then(res => this.setState({insertion: res.data}));

	}


returnToBeginning(ev){

	ev.preventDefault();
	this.setState({matches: this.props.matches, insertion: ''});

}

    render(){
	console.log(this.state.matches);
        const playerdata = this.state.matches.map((row, index) =>
                <tr key = {index}>
                        <td>{row['match_id']}</td>
                        <td>{row['duration'] == undefined?0:(row['duration']/60).toFixed(1)}</td>
                        <td>{row['game_mode'] == 22? 'Normal': 'Ranked'}</td>
                        <td>{row['radiant_win'] == 'True'? 'Radiant': 'Dire'}</td>
                        <td>{row['positive_votes'] == undefined?0:row['positive_votes']}</td>
  
                </tr>

        );
	let msg = '';


	if (this.state.insertion != ''){
		console.log(this.state.insertion);
		if (this.state.insertion.insertId != undefined){
			console.log('good');
			msg = 'success';
			console.log(this.state.insertion);
		}
		else{
			msg = this.state.insertion.sqlMessage;
		}

	}
        return (
            <div className = 'match_table'>{msg}
                 <form onSubmit = {this.handleSubmit}>
                        <input type = 'text' placeholder = 'Enter the match ID' name = 'userid'></input>
                        <input type = 'submit' value = 'Search'></input>
                </form>

		<form onSubmit = {this.returnToBeginning}>
			<input type = 'submit' value = 'Back'></input>
		</form>

		<form onSubmit = {this.handleInsert}>
			<input type = 'text' placeholder = 'match_id' name = 'id'></input>
			<input type = 'text' placeholder = 'duration' name = 'duration'></input>
			<input type = 'text' placeholder = 'game_mode' name = 'game_mode'></input>
			<input type = 'text' placeholder = 'radiant_win' name = 'win'></input>
			<input type = 'text' placeholder = 'votes' name = 'votes'></input>
			<input type = 'submit' value = 'Insert'></input>

		</form>


                <table className = 'tbl'>
                        <thead>
                                <tr>
                                        <th>Match ID</th>
                                        <th>Duration </th>
                                        <th> Game Mode</th>
                                        <th> Winner </th>
                                        <th> Positive Votes </th>
                                </tr>
                        </thead>
                        <tbody>
                                {playerdata}
                        </tbody>
                </table>
            </div>

        )
    }
}

