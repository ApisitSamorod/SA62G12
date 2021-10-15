import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TreatmentRecord from './components/TreatmentRecord'
import TempAppbar from './components/TempAppBar'

function App() {
  return (
	<Router>
		<div>
			<TempAppbar/>
			<Switch>
				<Route exact path="/" component={TreatmentRecord} />
			</Switch>
		</div>
	</Router>
  );
}

export default App;
