import React, { Component } from 'react';
import dota3 from './images/dota3.jpg';
import './header.css';
export default class Board extends React.Component{




    render(){

        return (

            <div className = 'bodyStyle'>
                <img src = {dota3} height = {700}></img>

            </div>
        );
    }

}
