import React, { Component } from 'react';
import dota2 from './images/dota2.jpg';
import './header.css';
import logo from '../logo.svg';
import '../App.css';
export default class Footer extends React.Component{
    render(){


        return (
            <div className = "try">
                
                <img src={logo} className="App-logo" alt="logo" />
                <br/>
                This page is made by Bowen, Stella and Christine
                
            </div>
        );
    }



}