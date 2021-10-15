import React, { useEffect }from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { 
	Typography, Button, TextField, FormControl, Container,
	Paper, Grid, Box, Divider, Snackbar, Select, MenuItem,
	InputLabel
} from '@material-ui/core';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { 
	UserInterface, ScreeningInterface, RemedyTypeInterface
} from "../models/index";

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

function TreatmentRecord() {
	const classes = useStyles();
	
	// prescription handler
	// --raw
	const [rawPrescription, setRawPrescription] = React.useState<string>("");
	const handleRawPrescriptionChange = (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { 
		setRawPrescription(event.target.value); 
	};
	// --note
	const [prescriptionInfo, setPrescriptionInfo] = React.useState<string>("");
	const handlePrescriptionInfoChange = (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { 
		setPrescriptionInfo(event.target.value); 
	};

	// toothnumber handler
	const [toothNumber, setToothNumber] = React.useState<string>("");
	const handleToothNumberChange = (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => { 
		setToothNumber(event.target.value); 
	};
	
	// date-time handler
	const [selectedDate, setSelectedDate] = React.useState<Date | null> (new Date());
	const handleDateChange = (date:Date | null) => { setSelectedDate(date); };

	// load dentists from database
	const [dentists, setDentists] = React.useState<UserInterface[]>([]);
	const [selectedDentist, setDentist] = React.useState("");
	const handleDentistChange = ( event:React.ChangeEvent<{ name?: string; value: unknown }> ) =>{
		setDentist(event.target.value as string);
	};
	const [currentDentist, setCurrentDentist] = React.useState<UserInterface>({ID:"",Name:""});

	const getDentists = async () => {
		const apiUrl = "http://localhost:8080/users/Dentist";
		const requestOption = {
			method : "GET",
			header : { "Content-Type" : "application/json" }
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) {
				setDentists(res.data);
				// ***This should be current dentist that logged in but let's leave it at that for now***
				setCurrentDentist(res.data[0]);
			};
		});
	};
		
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
	
	function submit() {
		let data = {
			PrescriptionRaw		: rawPrescription ?? "", 
			PrescriptionNote	: prescriptionInfo ?? "",
			ToothNumber			: toothNumber,
			Date				: selectedDate,
			ScreeningRecordID	: selectedScreening,
			DentistID			: currentDentist.ID,
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
			if (res.data) setOpen(true);
		});
	}
	// load nesssecary data from database
	useEffect(()=> {
		getDentists(); // this should change to load only the loggedin dentist
		getScreening();
		getRemedyTypes();
	}, []);

	return (
		<Container className={classes.container}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
				This is a success message!
				</Alert>
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
								onChange={handleDentistChange}
								value={currentDentist.ID}
								>
								<MenuItem value=""><em>None</em></MenuItem>
								{ dentists.map( (dentist:UserInterface) => (
									<MenuItem value={dentist.ID}>{dentist.Name}</MenuItem>
								))}
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
									<MenuItem value={screening.ID} >{screening.ID}</MenuItem>
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
								onChange={handleRawPrescriptionChange}
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
								onChange={handlePrescriptionInfoChange}
								multiline
								maxRows={4}
								/>
						</FormControl>
					</Grid>
					<Grid item xs={12}> 
						<FormControl fullWidth variant="outlined" >
							<TextField id="standard-basic" label="หมายเลขฟันที่รักษา" onChange={handleToothNumberChange}/>
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
						<Button component={RouterLink} to="/" variant="contained" > Back </Button>
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