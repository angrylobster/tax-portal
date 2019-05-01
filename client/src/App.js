import React, { Component } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
import Home from './components/Home';
import Submission from './components/Submission';
import Registration from './components/users/Registration';
import Edit from './components/users/Edit';
import Login from './components/users/Login';

class App extends Component {
	render() {
		return (
			<Router>
      			<Link to="/">Home</Link>{' '}
				<Link to="/login">Login</Link>
				<Link to="/submission">Submission</Link>
				<Link to="/registration">Registration</Link>
				<Link to="/edit/:id">Edit</Link>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/login" component={Login}/>
					<Route path="/submission" component={Submission}/>
					<Route path="/registration" component={Registration}/>
					<Route path="/edit/:id" component={Edit}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
