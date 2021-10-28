import React, {useEffect} from 'react'

import { useHistory } from "react-router";
import { Auth, UserCard } from './Utils'
import { TreatmentInteface, UserLogin } from '../models';

import { createStyles, makeStyles, Theme  } from '@material-ui/core/styles';

import {
	TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Table,
	Button, Icon, Container
} from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => 
	createStyles({
		root: {
			width: '75vw',
			margin: '16px'
		},
		table: {
			minWidth: 650,
		},
		buttonContainer: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			padding: '0px',
			gap: '8px'
		},
	})
);
  

export default function TreatmentData() {
	const classes = useStyles();
	const history = useHistory();

	// treatment-data list handler
	const [treatments, setTreatments] = React.useState<TreatmentInteface[]>([]);

	const getTreatments = async () => {
		const apiUrl = "http://localhost:8080/treatmentRecords";
		const requestOption = {
			method : "GET",
			header : { "Content-Type" : "application/json" }
		};
		
		fetch(apiUrl, requestOption)
		.then((response) => response.json())
		.then((res) => {
			console.log(res.data);
			if (res.data) setTreatments(res.data);
		});
	}

	const [user, setUser] = React.useState<UserLogin>({
		ID: "", Name: "", RoleID: "", RoleName: ""
	});

	useEffect(()=>{
		Auth(history, false, setUser);
		getTreatments();
	}, []);

	return (
		<React.Fragment>
			<UserCard data={user}/>
			<TableContainer component={Paper} className={classes.root}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell>RecordID</TableCell>
					<TableCell align="left">Name</TableCell>
					<TableCell align="right">Treatment</TableCell>
					<TableCell align="right">Date</TableCell>
					<TableCell align="right">Tooth Number</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{treatments.map((treatment) => (
					<TableRow key={treatment.ID}>
					<TableCell component="th" scope="row">{treatment.ID}</TableCell>
					<TableCell align="left">{treatment.Screening.Patient.Firstname} {treatment.Screening.Patient.Lastname}</TableCell>
					<TableCell align="right">{treatment.RemedyType.Name}</TableCell>
					<TableCell align="right">{new Date( treatment.Date ).toLocaleString("th-TH")}</TableCell>
					<TableCell align="right">{treatment.ToothNumber}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
			<Container className={classes.buttonContainer}>
					<Button
						variant="contained"
						startIcon={<Icon>arrow_back_ios</Icon>}
						size="small"
						onClick={ () => {
							history.goBack()
						}}
					> back </Button>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Icon>save</Icon>}
						size="small"
						onClick={ () => {
							history.push('/treatment_record', user)
						}}
					> บันทึกข้อมูล </Button>
					</Container>
		</React.Fragment>
	);
}