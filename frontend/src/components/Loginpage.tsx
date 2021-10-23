import React, {useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { 
	Typography, Button, FormControl, Container,
	Box, Divider, Snackbar, Card,
	InputLabel, Input, InputAdornment, IconButton, Icon
} from '@material-ui/core';
import MuiAlert, { AlertProps, Color as AlertColor } from '@material-ui/lab/Alert'
import { 
	Visibility, VisibilityOff, AccountCircle
} from '@material-ui/icons'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { setCookie, Auth } from './Utils'
import { UserLogin, AlertInfo } from '../models';

// css style classes
const useStyles = makeStyles( (them:Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textForm: {
		margin: '8px',
		display: 'flex',
		maxWidth: '25ch',
	},
	loginButton: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '16px 0px 0px 0px',
		margin: '8px',
		maxWidth: '25ch',
	},
	card : {
		padding: '0px 8px',
	},
	head : {
		margin: '8px 8px -4px 8px',
	}
}))

// interface for user login data
interface UserData {
	Username: string;
	Password: string;
	showPassword: boolean;
}

// interface for alert props


// custom alert I supposed
function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// this is login page
// no props required
export default function LoginPage() {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation<UserLogin>();

	//----------------------------//
	// Value user passed in
	const [values, setValues] = React.useState<UserData>({
		Username: '',
		Password: '',
		showPassword: false,
	});
	const handleChange = (prop: keyof UserData) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	//----------------------------//
	////////////////////////////////
	//----------------------------//
	// Alert for user notice
	const [status, setStatus] = React.useState(false);
	const [message, setMessage] = React.useState<AlertInfo>({message:'',level: 'warning'});

	const Login = async () => {
		let data = {
			Username : values.Username,
			Password : values.Password
		}
		const apiUrl = 'http://localhost:8080/login';
		const requestOption = {
			method : "POST",
			header : { "Content-Type" : "application/json" },
			body : JSON.stringify(data)
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (!res.data) {
				// Faliled to login
				setStatus(true);
				setMessage({message:"Incorrect Username or Password", level:'error'});
			} else {
				// Login succesfully
				// change to main page with login props
				setCookie("g12_auth", res.data.Key, 1);
				history.replace("/home", res.data);
			}
		});
	};

	const handleClick = () => {
		// no input in field
		if ( values.Username === "" || values.Password === "" ) {
			setStatus(true);
			setMessage({message:"Empty username or password", level:'warning'});
		} else {
			Login();
		}
	};
	
	const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') return;
		setStatus(false);
	};
	//----------------------------//

	useEffect(()=> {
		Auth(location, history, true);
	}, []);

	return (
		<React.Fragment>
			<Snackbar open={status} autoHideDuration={6000} onClose={handleClose}>
			<Alert severity={message.level} onClick={handleClose}> {message.message} </Alert>
			</Snackbar>
			<Box className={classes.root} >
				<Card className={classes.card}>
				<Typography className={classes.head} variant="h6">G12 Dental-Clinic</Typography>
				<Divider/>
				<FormControl className={classes.textForm}>
					<InputLabel>Username</InputLabel>
					<Input
						type='text'
						value={values.Username}
						onChange={handleChange('Username')}
						endAdornment={
							<InputAdornment position="end"> 
							<IconButton disabled> <AccountCircle/> </IconButton> 
							</InputAdornment>
						}/>
				</FormControl>
				<FormControl className={classes.textForm}>
					<InputLabel>Password</InputLabel>
					<Input
						type={values.showPassword ? 'text' : 'password'}
						value={values.Password}
						onChange={handleChange('Password')}
						endAdornment={
							<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
							{values.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
							</InputAdornment>
						}/>
				</FormControl>
				<Container className={classes.loginButton}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Icon>arrow_forward_ios</Icon>}
						size="small"
						onClick={handleClick}
					> Login </Button>
					</Container>
				</Card>
			</Box>
		</React.Fragment>
	);
}