package entity

import (
	"time"
	"gorm.io/gorm"
)

type TreatmentRecord struct {
	gorm.Model 
	
	PrescriptionRaw		string 
	PrescriptionNote	string
	ToothNumber			string
	Date				time.Time

	ScreeningRecordID 	*uint
	ScreeningRecord		Screening			`gorm:"foreignKey:ScreeningRecordID"`

	DentistID			*uint
	Dentist				User				`gorm:"foreignKey:DentistID"`

	RemedyTypeID		*uint
	RemedyType			RemedyType			`gorm:"foreignKey:RemedyTypeID"`

	Medicines 			[]MedicineRecord	`gorm:"foreignKey:TreatmentRecordID"`
}