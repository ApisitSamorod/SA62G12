import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TreatmentRecord from './components/TreatmentRecord'
//import TempAppbar from './components/TempAppBar'
import LoginPage from './components/Loginpage';
import MainPage from './components/MainPage';
import TreatmentData from './components/TreatmentData';

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
				<Route exact path="/home" component={MainPage} />
				<Route exact path="/treatment_record" component={TreatmentRecord} />
				<Route exact path="/treatment_record_data" component={TreatmentData} />

			</Switch>
		</div>
	</Router>
  );
}

export default App;
