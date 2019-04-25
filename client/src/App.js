import React, { Component } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom';
import Submission from './components/Submission';

const Home = () => <p>Home</p>;
const Login = () => <p>Login</p>

class App extends Component {

	constructor() {
		super();
		this.state = {
			someState: null,
		}
	}

	componentDidMount() {
		fetch('/users')
			.then(res => {
				return res.json();
			})
			.then(json => {
				this.setState({
					someState: json[0]
				})
			})
	}

	render() {
		return (
			<Router>
      			<Link to="/">Home</Link>{' '}
				<Link to="/login">Login</Link>
				<Link to="/submission">Submission</Link>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/login" component={Login}/>
					<Route path="/submission" component={Submission}/>
				</Switch>
			</Router>
		);
	}
}

export default App;
