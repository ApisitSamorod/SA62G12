package entity

import (
	"gorm.io/gorm"
)

type Job struct {
	gorm.Model
	Name			string
	Info			string

	Patients		[]Patient	`gorm:"foreignKey:JobID"`
}