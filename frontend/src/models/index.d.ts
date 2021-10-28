import { Color as AlertColor } from '@material-ui/lab/Alert'
import ScreeningInterface from "./IScreening"
import PatientInterface from "./IPatient"
import RemedyTypeInterface from "./IRemedyType"

interface UserLogin {
	ID : string;
	RoleID : string;
	Name : string;
	RoleName : string;
}

interface AlertInfo {
	message : string;
	level	: AlertColor;
}

export type {
	ScreeningInterface,
	UserInterface,
	RemedyTypeInterface,
	UserLogin,
	AlertInfo,
	PatientInterface,
}

export interface TreatmentInteface {
	ID : string;
	Date: Date;
	ToothNumber: string;
	Screening : ScreeningInterface;
	RemedyType: RemedyTypeInterface;
}