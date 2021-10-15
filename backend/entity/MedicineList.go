package entity

import (
	"gorm.io/gorm"
)

type MedicineList struct {
	gorm.Model
	Name				string
	Info				string

	MedicineRecords		[]MedicineRecord `gorm:"foreignKey:MedicineID"`
}