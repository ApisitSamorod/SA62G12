package entity

import (
	"time"
	"gorm.io/gorm"
)

type Patient struct {
	gorm.Model
	Name			string
	Sex				string
	Age				uint
	Allergy			string
	IDcard			string
	Time			time.Time
	PhoneNumber		string

	InsuranceID		*uint
	Insurance		Insurance			`gorm:"foreignKey:InsuranceID"`

	RecorderID		*uint
	User			User				`gorm:"foreignKey:RecorderID"`

	JobID			*uint
	Job				Job					`gorm:"foreignKey:JobID"`

	Screenings		[]Screening			`gorm:"foreignKey:PatientID"`
	Appointments	[]Appointment		`gorm:"foreignKey:PatientID"`
	MedicineRecords	[]MedicineRecord	`gorm:"foreignKey:PatientID"`
	Payments		[]Payment			`gorm:"foreignKey:PatientID"`
}