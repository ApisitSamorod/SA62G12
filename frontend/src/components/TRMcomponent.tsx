import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import TreatmentRecord from './TreatmentRecord'
import TreatmentData from './TreatmentData';
import { Auth, UserCard } from './Utils';
import { useHistory } from "react-router";
import {UserLogin} from '../models'

function TRMcomponent() {
	
	const history = useHistory();
	const [user, setUser] = React.useState<UserLogin>({
		ID: "", Name: "", RoleID: "", RoleName: ""
	});

	useEffect(()=>{
		Auth( history, false, setUser )
	},[])

	return (
		<div>
			<UserCard data={user} />

			<Route exact path="/treatment_record" render={ ()=>< TreatmentRecord user={user}/> }  />
			<Route exact path="/treatment_record_data" component={TreatmentData} />
		</div>
  );
}

export default TRMcomponent;
