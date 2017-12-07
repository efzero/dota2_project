import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './header.css';
export default class View extends React.Component{

   constructor(props){
        super(props);
        this.state = {
                matches: this.props.matches
        }
}


   render(){
	console.log(this.state.matches);
	const data = this.state.matches.map((entry,index) => <p key = {index}>This player uses {entry.name} in a match with match id {entry.match_id}. He created a damage of {entry.hero_damage} in this match</p>);







		return (


			<div>	
			{data}
			<p>
				The most-played game on Steam.
Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it is their 10th hour of play or 1,000th, there is always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.
			</p>


			</div>
		);

	}



}
