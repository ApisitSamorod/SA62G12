import React from 'react'

import { 
	Typography, Button, Card, CardContent, CardActions, Icon
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

//import { useHistory, useLocation } from 'react-router-dom';
import { UserLogin } from "../models";

import * as H from 'history'
import { useHistory } from 'react-router';

export const Auth = async (history : H.History, isLoginPage: boolean, setUser: React.Dispatch<React.SetStateAction<UserLogin>> ) => {
	const apiUrl = 'http://localhost:8080/TRMauth';
	const requestOption = {
		method : "GET",
		header : { "Content-Type" : "application/json" },
		credentials : 'include' as RequestCredentials,
	};

	fetch(apiUrl, requestOption)
	.then((response) => response.json())
	.then((res) => {
		if (res.data) {
			if ( isLoginPage )
				history.replace("/home", res.data)
			setUser(res.data)
		} else {
			history.replace("/")
		}
	});
}

const useStyles = makeStyles( (them:Theme) => createStyles({
	card: {
		display: 'flex',
		flexDirection: 'column',
		width: '12vw',
		minHeight: '10vh',
		position: 'fixed',
		top: 0,
		right: 0,
		margin: '20px'
	},
}))

export const UserCard = (props: {data:UserLogin}) => {
	const classes = useStyles();
	const history = useHistory();

	function Logout() {
		const apiUrl = 'http://localhost:8080/TRMlogout';
		const requestOption = {
			method : "GET",
			header : { "Content-Type" : "application/json" },
			credentials : 'include' as RequestCredentials,
		};

		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			if (res.data) {
				history.replace("/")
			} 
		});
	}

	return (
		<React.Fragment>
		<Card className={classes.card}>
			<CardContent>
			<Typography color="textSecondary" gutterBottom>
				{props.data.RoleName}
			</Typography>
			<Typography variant="h5" component="h2">
				{props.data.Name}
			</Typography>
			</CardContent>
			<CardActions style={ { display:'flex', justifyContent: 'flex-end' } }>
				<Button 
					size="small" color='primary' 
					endIcon={<Icon>logout</Icon>}
					onClick={Logout}
				> Logout </Button>
			</CardActions>
		</Card>
		</React.Fragment>
	)
}