package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	CureName			string
	Price				float32
	Date				time.Time
	Note				string

	PatientID			*uint
	Patient				Patient			`gorm:"foreignKey:PatientID"`

	MedicineRecordID	*uint
	MedicineRecord		MedicineRecord	`gorm:"foreignKey:MedicineRecordID"`

	FinancerID			*uint
	User				User			`gorm:"foreignKey:FinancerID"`
}