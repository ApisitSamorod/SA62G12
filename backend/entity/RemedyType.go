package entity

import (
	"gorm.io/gorm"
)

type RemedyType struct {
	gorm.Model
	Name				string
	Info				string
	
	Appointments		[]Appointment		`gorm:"foreignKey:RemedyTypeID"`
	TreatmentRecords	[]TreatmentRecord	`gorm:"foreignKey:RemedyTypeID"`
}