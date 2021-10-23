import { Color as AlertColor } from '@material-ui/lab/Alert'
import ScreeningInterface from "./IScreening"
import UserInterface from "./IUser"
import RemedyTypeInterface from "./IRemedyTypeInteface"

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
	AlertInfo
}

