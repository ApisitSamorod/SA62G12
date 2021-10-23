package entity

import (
	"gorm.io/gorm"
)

type Screening struct {
	gorm.Model
	Name 				string
	Illness				string
	Detail 				string

	DentistAssistanceID	*uint
	User				User				`gorm:"foreignKey:DentistAssistanceID"`

	PatientID			*uint
	Patient				Patient				`gorm:"foreignKey:PatientID"`

	AppointmentID		*uint
	Appointment			Appointment			`gorm:"foreignKey:AppointmentID"`

	CurrentMedicationID	*uint
	CurrentMedication	CurrentMedication	`gorm:"foreignKey:CurrentMedicationID"`
}