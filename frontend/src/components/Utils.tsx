import React from 'react'
import { 
	Typography, Icon,
	Drawer, List, ListItem, Divider, ListItemText, ListItemIcon
} from '@material-ui/core';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
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
				history.replace("/treatment_record_data", res.data)
			setUser(res.data)
		} else {
			history.replace("/")
		}
	});
}

const drawerWidth = '240px';

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
	drawer: 
	{
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
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
				history.replace("")
			} 
		});
	}

	return (
		<React.Fragment>

		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
			anchor="right"
		>
			<List>
			<ListItem style={{flexDirection: 'column', alignItems: 'start', paddingBottom:'16px'}}>
				<Typography color="textSecondary" gutterBottom>
					{props.data.RoleName}
				</Typography>
				<Typography variant="h5" component="h2">
					{props.data.Name}
				</Typography>
			</ListItem>
			<Divider/>
			<ListItem button onClick={ () => history.replace('/treatment_record') }>
				<ListItemText style={{ display:'flex',justifyContent:'flex-end'}} >Add record</ListItemText>
				<ListItemIcon 
					style={{ justifyContent:'flex-end'}} 
				><Icon>playlist_add</Icon></ListItemIcon>
			</ListItem>
			<ListItem button onClick={ () => history.replace('/treatment_record_data') }>
				<ListItemText style={{ display:'flex',justifyContent:'flex-end'}} >Record view</ListItemText>
				<ListItemIcon 
					style={{ justifyContent:'flex-end'}} 
				><Icon>view_list</Icon></ListItemIcon>
			</ListItem>
			<ListItem button onClick={ Logout }>
				<ListItemText style={{ display:'flex',justifyContent:'flex-end'}} >Logout</ListItemText>
				<ListItemIcon 
					style={{ justifyContent:'flex-end'}} 
				><Icon>logout</Icon></ListItemIcon>
			</ListItem>
			</List>
		</Drawer>

		</React.Fragment>
	)
}