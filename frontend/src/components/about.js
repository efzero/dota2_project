import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './header.css';
export default class About extends React.Component{

   constructor(props){
        super(props);
        this.state = {
                matches: this.props.matches
        }
}


   render(){
		return (
			<div>	
			<p>
				The most-played game on Steam.
Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it is their 10th hour of play or 1,000th, there is always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has truly taken on a life of its own.
			</p>


			<p>
				One Battlefield. Infinite Possibilities.
When it comes to diversity of heroes, abilities, and powerful items, Dota boasts an endless array—no two games are the same. Any hero can fill multiple roles, and there is an abundance of items to help meet the needs of each game. Dota does not provide limitations on how to play, it empowers you to express your own style.			</p>
			</div>
		);

	}
