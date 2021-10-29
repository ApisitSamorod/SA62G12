import React, {useEffect} from 'react'
import { TreatmentInteface } from '../models';
import { createStyles, makeStyles, Theme  } from '@material-ui/core/styles';
import {
	TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Table, Container
} from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => 
	createStyles({
		root: {
			width: 'calc(100% - 240px)',
			marginRight: '240px',
			padding: '24px'
		},
		table: {
		},
	})
);

export default function TreatmentData( ) {
	const classes = useStyles();

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

	useEffect(()=>{
		getTreatments();
	}, []);

	return (
		<React.Fragment>
			<Container className={classes.root}>
			<TableContainer component={Paper} >
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
			</Container>
		</React.Fragment>
	);
}