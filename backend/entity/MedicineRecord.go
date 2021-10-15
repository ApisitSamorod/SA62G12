package entity

import (
	"gorm.io/gorm"
)

type MedicineRecord struct {
	gorm.Model
	Name				string

	MedicineID			*uint
	MedicineList		MedicineList	`gorm:"foreignKey:MedicineID"`

	TreatmentRecordID	*uint
	TreatmentRecord		TreatmentRecord	`gorm:"foreignKey:TreatmentRecordID"`

	PatientID			*uint
	Patient				Patient			`gorm:"foreignKey:PatientID"`

	UserID				*uint
	User				User			`gorm:"foreignKey:UserID"`

	Payments			[]Payment		`gorm:"foreignKey:MedicineRecordID"`
}