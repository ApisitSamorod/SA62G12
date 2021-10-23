import React from 'react'

import { useLocation, useHistory } from "react-router";
import { Auth, UserCard } from './Utils'
import { UserLogin } from '../models';

export default function TreatmentData() {

	const location = useLocation<UserLogin>()
	const history = useHistory();

	return (
		<React.Fragment>
			<UserCard data={location.state}/>
		</React.Fragment>
	);
}