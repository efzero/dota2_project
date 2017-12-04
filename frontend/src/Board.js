// import React, { Component } from 'react';
// import dota3 from './dota3.jpg';
// export default class Board extends React.Component{




//     render(){
//         return (
//             <div>
//                 <a>
//                 {/* <img src = {dota3} > </img> */}
//                 </a>
//             </div>
//         );
//     }

// }

import React, { Component } from 'react';
import dota2 from './images/dota2.jpg';
import './header.css';
export default class Header extends React.Component{
    render(){
        const logostyle = {
            width: 160,
            height: 80,
            verticalAlign: "middle"
        }


        return (
            <div className = 'header'>
                <a className = 'home' onClick = {() => this.props.onClick(1)}>
                    <img src = {dota2} style = {logostyle}></img>
                    <span className = 'spanHover'> Home </span>
                </a>
                <a className = 'nav' onClick = {() => this.props.onClick(2)}> User </a>
                <a className = 'nav' onClick = {() => this.props.onClick(3)}> Matches </a>
                <a className = 'nav' onClick = {() => this.props.onClick(4)}> Statistics </a>
                <a className = 'nav' onClick = {() => this.props.onClick(5)}> About </a>

            </div>
        );
    }



}