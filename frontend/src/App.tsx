import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './components/Loginpage';
import TRMcomponent from './components/TRMcomponent';

function App() {
	
	return (

	<Router>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
		/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
		<div>
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route exact component={TRMcomponent} />
			</Switch>
		</div>
	</Router>
  );
}

export default App;
