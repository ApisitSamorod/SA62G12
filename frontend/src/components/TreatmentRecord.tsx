import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
	Typography, Button, TextField, FormControl, Container,
	Paper, Grid, Box, Divider, Snackbar, Select, MenuItem,
	InputLabel,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { 
	ScreeningInterface, RemedyTypeInterface, UserLogin, AlertInfo
} from "../models";

import { useLocation, useHistory } from "react-router";
import { Auth, UserCard } from './Utils'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme:Theme) => 
	createStyles({
		root: {flexGrow: 1},
		container: {marginTop: theme.spacing(2), maxWidth:"40vw"},
		paper: {padding: theme.spacing(2), color: theme.palette.text.secondary},
		formControl: {
			margin: theme.spacing(0),
			minWidth: "100%",
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},  
	})
);

interface treatmentFields {
	rawPrescription: string;
	prescriptionInfo: string;
	toothNumber: string;
}


function TreatmentRecord() {
	const classes = useStyles();
	const location = useLocation<UserLogin>()
	const history = useHistory();

	const [otherData,setOtherData] = React.useState<treatmentFields>({
		rawPrescription: "",
		prescriptionInfo: "",
		toothNumber: "",
	})

	const handleDataChange = (prop: keyof treatmentFields ) => (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		setOtherData( { ...otherData, [prop]:event.target.value } )
	} 
	
	// date-time handler
	const [selectedDate, setSelectedDate] = React.useState<Date | null> (new Date());
	const handleDateChange = (date:Date | null) => { setSelectedDate(date); };
		
	// screenings list handler
	const [screenings, setScreenings ] = React.useState<ScreeningInterface[]>([])
	const [selectedScreening, setScreening] = React.useState("");
	const handleScreeningChange = ( event:React.ChangeEvent<{ name?: string; value: unknown }> ) =>{
		setScreening(event.target.value as string);
	};

	const getScreening = async () => {
		const apiUrl = "http://localhost:8080/screenings";
		const requestOption = {
			method : "GET",
			header : { "Content-Type" : "application/json" }
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setScreenings(res.data);
		});
	}

	// remedy-types list handler
	const [remedyTypes, setRemedyTypes] = React.useState<RemedyTypeInterface[]>([]);
	const [selectedRemedy, setRemedy] = React.useState("");
	const handleRemedyTypeChange = ( event:React.ChangeEvent<{ name?: string; value: unknown }> ) =>{
		setRemedy(event.target.value as string);
	};

	const getRemedyTypes = async () => {
		const apiUrl = "http://localhost:8080/remedy_types";
		const requestOption = {
			method : "GET",
			header : { "Content-Type" : "application/json" }
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setRemedyTypes(res.data);
		});
	}

	// popup handler
	const [open, setOpen] = React.useState(false);
	// use too simulate summit button
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	
	const [message, setMessage] = React.useState<AlertInfo>({message:'',level: 'warning'});

	function submit() {

		if ( location.state.RoleName != "Dentist" ) {
			setOpen(true);
			setMessage( { message:'You have no authorize to make this action', level:'error'} );
			return;
		}

		let data = {
			PrescriptionRaw		: otherData.rawPrescription, 
			PrescriptionNote	: otherData.prescriptionInfo,
			ToothNumber			: otherData.toothNumber,
			Date				: selectedDate,
			ScreeningRecordID	: selectedScreening,
			DentistID			: location.state.ID,
			RemedyTypeID		: selectedRemedy
		};

		const apiUrl = "http://localhost:8080/treatmentRecord";
		const requestOption = {
			method : "POST",
			header : { "Content-Type" : "application/json" },
			body : JSON.stringify(data)
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			setOpen(true);
			if (res.data) setMessage( { message:'Succesfully saved', level:'success' } );
			else setMessage( { message:'Failed to save', level:'error' } );
		});
	}
	// load nesssecary data from database
	useEffect(()=> {
		if ( !location.state )
			Auth( location, history, false );
		getScreening();
		getRemedyTypes();
	}, []);

	return (
		<Container className={classes.container}>
			<UserCard data={location.state}/>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert severity={message.level} onClick={handleClose}> {message.message} </Alert>
			</Snackbar>
			<Paper className={classes.paper}>
				<Box display="flex">
					<Box flexGrow={1}>
						<Typography
							component="h2"
							variant="h6"
							color="primary"
							gutterBottom	
						>
							บันทึกการรักษาทางทันตกรรม
						</Typography>
					</Box>	
				</Box> 
				<Divider/>
				<Grid container spacing={3} className={classes.root}>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-readonly-label">หมอฟัน</InputLabel>
							<Select
								labelId="demo-simple-select-readonly-label"
								id="demo-simple-select-readonly"
								inputProps={{ readOnly: true }}
								value={location.state.ID}
								>
								<MenuItem value={location.state.ID}>{location.state.Name}</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">ใบคัดกรองข้อมูลพื้นฐาน</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								onChange={handleScreeningChange}
								>
								<MenuItem value=""><em>None</em></MenuItem>
								{ screenings.map( (screening:ScreeningInterface) => (
									<MenuItem value={screening.ID} >{screening.ID} {screening.User.Name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">ประเภทการรักษา</InputLabel>
								<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								onChange={handleRemedyTypeChange}
								>
								<MenuItem value=""><em>None</em></MenuItem>
								{ remedyTypes.map( (remedyType:RemedyTypeInterface) => (
									<MenuItem value={remedyType.ID} >{remedyType.Name}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}> 
						<FormControl fullWidth variant="outlined" >
							<TextField
								id="standard-multiline-flexible"
								label="ใบสั่งยา"
								onChange={handleDataChange('rawPrescription')}
								multiline
								maxRows={4}
								/>
						</FormControl>
					</Grid>
					<Grid item xs={12}> 
						<FormControl fullWidth variant="outlined" >
							<TextField
								id="standard-multiline-flexible"
								label="หมายเหตุการสั่งยา"
								onChange={handleDataChange('prescriptionInfo')}
								multiline
								maxRows={4}
								/>
						</FormControl>
					</Grid>
					<Grid item xs={12}> 
						<FormControl fullWidth variant="outlined" >
							<TextField id="standard-basic" label="หมายเลขฟันที่รักษา" onChange={handleDataChange('toothNumber')}/>
						</FormControl>
					</Grid>
					<Grid item xs={12}> 
						<FormControl fullWidth variant="outlined" >
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDateTimePicker
								margin="normal"
								id="date-picker-dialog"
								label="วันที่ทำการรักษา"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" 
							onClick={()=>{
								history.push("/home", location.state)
							}}
						> Back </Button>
						<Button style={{float:"right"}} variant="contained" color="primary" 
							onClick={submit}
							> 
							บันทึกข้อมูลการรักษา
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}

export default TreatmentRecord;