package entity

import (
	"gorm.io/gorm"
)

type CurrentMedication struct {
	gorm.Model
	Name			string
	
	Screenings		[]Screening	`gorm:"foreignKey:CurrentMedicationID"`	
}