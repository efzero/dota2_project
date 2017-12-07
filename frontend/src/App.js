import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header.js';
import Board from './components/Board2.js';
import Footer from './components/Footer.js';
import Retrieval from './components/retrieval.js';
import Matches from './components/matches.js';
import Stats from './components/stats.js';
import About from './components/about.js';
import View from './components/view.js';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    users:[],
    players: [],
    matches: [],
    current:1,
    detailData: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.changeView = this.changeView.bind(this);

  }



changeView(data){

	console.log(data[0]);
	this.setState({current: 6, detailData: data[0]});


}


  handleClick(i){
    console.log(i);
    this.setState({current: i});
  }
  


  componentDidMount(){
    
    	fetch('/users').then(res=> res.json()).then(res => this.setState({users: res})).catch(function(err){console.log(err)});
	fetch('/players').then(res => res.json()).then(res => this.setState({players: res})).catch(function(err){console.log(err)});
	fetch('/matches').then(res => res.json()).then(res => this.setState({matches: res})).catch(function(err){console.log(err)});

}



  render() {

    const li_style = {textAlign: "left", whiteSpace: "pre"}
	
    const current_users = this.state.users.map((entry,index) => [entry['id'], entry['username']]);



    const user_list = current_users.map((entry,index) => <li key={index} style = {li_style}>ID: {entry[0]},        Username: {entry[1]}</li>);







    let content = <Board/>
    if (this.state.current == 2) content = <Board/>
    switch(this.state.current){
      case 1:
        content = <Board/>;
        break;
      case 3:
        content = <Matches matches = {this.state.matches}/>;
        break;
      case 2:
        content = <Retrieval players = {this.state.players} gotoParent = {this.changeView}/>;
        break;
      case 4:
	content = <Stats players = {this.state.players} matches = {this.state.matches}/>;
	break;

      case 5:
	content = <About/>;
	break;


      case 6:
	content = <View matches ={this.state.detailData}/>;
	break;
    }

    console.log(this.state.current);    
    console.log(this.state.matches);


    return (

      <div className="App">
        <Header onClick = {this.handleClick}/>
        {content}

        <Footer/>
        {/* <Footer /> */}

        

      </div>
    );
  }
}

export default App;
