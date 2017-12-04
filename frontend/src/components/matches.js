import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './header.css';
export default class Matches extends React.Component{

   constructor(props){
        super(props);
        this.state = {
                matches: this.props.matches
        }
}



    render(){
        const playerdata = this.state.matches.map((row, index) =>
                <tr key = {index}>
                        <td>{row['match_id']}</td>
                        <td>{row['duration'] == undefined?0:(row['duration']/60).toFixed(1)}</td>
                        <td>{row['game_mode'] == 22? 'Normal': 'Ranked'}</td>
                        <td>{row['radiant_win'] == 'True'? 'Radiant': 'Dire'}</td>
                        <td>{row['positive_votes'] == undefined?0:row['positive_votes']}</td>
  
                </tr>

        );
        console.log(this.state.players);

        return (
            <div>
                 <form onSubmit = {this.handleSubmit}>
                        <input type = 'text' placeholder = 'Enter the accountID' name = 'userid'></input>
                        <input type = 'submit' value = 'Search'></input>
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

