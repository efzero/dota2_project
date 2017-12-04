import React, { Component } from 'react';
import dota2 from './images/dota2.jpg'
import './header.css';
export default class Header extends React.Component{
    render(){
        const logostyle = {
            width: 160,
            height: 80,
            verticalAlign: "middle"
        }


        return (
            <div className = 'headerr'>
                <a className = 'home' onClick = {() => this.props.onClick(1)}>
                    <img src = {dota2} style = {logostyle}></img>
                    <span className = 'spanHover'> Home </span>
                </a>
                <a className = 'navv' onClick = {() => this.props.onClick(2)}> User </a>
                <a className = 'navv' onClick = {() => this.props.onClick(3)}> Matches </a>
                <a className = 'navv' onClick = {() => this.props.onClick(4)}> Statistics </a>
                <a className = 'navv' onClick = {() => this.props.onClick(5)}> About </a>

            </div>
        );
    }



}
