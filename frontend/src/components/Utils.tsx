import React from 'react'

import { 
	Typography, Button, FormControl, Container,
	Box, Divider, Snackbar, Card, CardContent, CardActions,
	InputLabel, Input, InputAdornment, IconButton, Icon
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

//import { useHistory, useLocation } from 'react-router-dom';
import { UserLogin } from "../models";

import * as H from 'history'
import { useHistory } from 'react-router';

function setCookie(cname:string, cvalue:string, exdays:number): void {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname:string): string {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

const Auth = async ( location : H.Location<UserLogin>, history : H.History, isLoginPage: boolean ) => {
	const cookie = getCookie("g12_auth")
	// get user cookie
	if (cookie) {
		// yes we has our cookies, check to database
		let data = { Key: cookie }
		const apiUrl = 'http://localhost:8080/auth';
		const requestOption = {
			method : "POST",
			header : { "Content-Type" : "application/json" },
			body : JSON.stringify(data)
		};
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			if (!res.data) {
				setCookie("g12_auth", "", 0);
				if (!isLoginPage)
					history.replace("/", {nocheck:true});
			} else {
				if (isLoginPage) history.replace("/home", res.data); 
				else location.state = res.data;
			}
		});
	} else if (!isLoginPage) history.replace("/", {nocheck:true});
}

export { setCookie, getCookie, Auth }

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
		setCookie("g12_auth", "", 0);
		history.replace("/"); 
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