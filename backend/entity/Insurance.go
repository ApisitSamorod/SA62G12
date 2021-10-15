package entity

import (
	"gorm.io/gorm"
)

type Insurance struct {
	gorm.Model
	Name			string
	Info			string

	Patients		[]Patient	`gorm:"foreignKey:InsuranceID"`
}