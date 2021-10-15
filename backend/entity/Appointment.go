package entity

import (
	"time"
	"gorm.io/gorm"
)

type Appointment struct {
	gorm.Model
	Date			time.Time
	Todo			string

	DentistID		*uint
	Dentist			User		`gorm:"foreignKey:DentistID"`	

	PatientID		*uint
	Patient			Patient		`gorm:"foreignKey:PatientID"`
	
	RemedyTypeID	*uint
	RemedyType		RemedyType	`gorm:"foreignKey:RemedyTypeID"`
}