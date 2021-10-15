package entity

import (
	"gorm.io/gorm"
)

// We can use 1-1 or m-m for user and role

type User struct {
	gorm.Model
	Name				string
	Username			string				`gorm:"uniqueIndex"`
	Password			string

	RoleID				*uint
	Role				Role				`gorm:"foreignKey:RoleID"`			

	TreatmentRecords	[]TreatmentRecord	`gorm:"foreignKey:DentistID"`
	Screenings			[]Screening			`gorm:"foreignKey:DentistAssistanceID"`
	Appointments		[]Appointment		`gorm:"foreignKey:DentistID"`
	MedicineRecords		[]MedicineRecord	`gorm:"foreignKey:UserID"`
	Patients			[]Patient			`gorm:"foreignKey:RecorderID"`
	Payments			[]Payment			`gorm:"foreignKey:FinancerID"`
}

type Role struct {
	gorm.Model
	Name				string				`gorm:"uniqueIndex"`
	Info				string

	Users				[]User				`gorm:"foreignKey:RoleID"`
}