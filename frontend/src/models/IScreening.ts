import PatientInterface from "./IPatient"

export default interface ScreeningInterface {
	ID			: string;
	Queue		: string;
	Patient		: PatientInterface;
}