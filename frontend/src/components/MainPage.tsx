import React, {useEffect} from "react";
import { useLocation, useHistory } from "react-router";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { 
	Typography, Button, Container, Box, Icon,
	Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';
import { Auth, UserCard } from './Utils';
import { UserLogin } from "../models";

const useStyles = makeStyles( (them:Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		alignItems: 'center',
		padding: '0px',
		margin: '0px',
	},
	block: {
		display: 'flex',
		width: '66vw',
		margin: '10vh 0px 0px 0px',
	},
	accordion: {
		width: '100%',
	},
	accordionDetail: {
		display: 'grid',
		gridTemplateColumns: '64% auto'
	},
	TypoContainer: {
		padding: '0px',
	},
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: '0px',
		gap: '8px'
	}
}))

export default function MainPage() {
	const classes = useStyles();
	const history = useHistory();
	
	const [user, setUser] = React.useState<UserLogin>({
		ID: "", Name: "", RoleID: "", RoleName: ""
	});

	useEffect(()=> {
		Auth(history, false, setUser)
	}, []);

	return (
		<React.Fragment>
		<UserCard data={user}/>
		<Box className={classes.root} >
			<Box className={classes.block}>
			<Accordion className={classes.accordion} >
				<AccordionSummary
				expandIcon={<Icon>expand_more</Icon>}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
				<Typography >Treatment Records</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.accordionDetail}>
				<Typography className={classes.TypoContainer} > ระบบบันทึกการรักษาทางทันตกรรม </Typography>
					<Container className={classes.buttonContainer}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Icon>search</Icon>}
						size="small"
						onClick={ () => {
							history.push('/treatment_record_data', user)
						}}
					> ดูข้อมูล </Button>
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
				</AccordionDetails>
			</Accordion>
			</Box>
		</Box>
		</React.Fragment>
	)
}