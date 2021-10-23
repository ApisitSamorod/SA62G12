package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase(firstSetup bool) {
	database, err := gorm.Open(sqlite.Open("DentalClinic.db"), &gorm.Config{})
	if err != nil {
		panic("failed to open database")
	}

	database.AutoMigrate(
		&User{},
		&RemedyType{},
		&Screening{},
		&TreatmentRecord{},
		&Role{},
		&Patient{},
		&Appointment{},
		&Job{},
		&CurrentMedication{},
		&Insurance{},
		&MedicineList{},
		&MedicineRecord{},
		&Payment{},
		&Auth{},
	)

	db = database

	if firstSetup {
		DefaultData()
	}
}

func setupRole() {
	db.Create(&Role{Name: "Dentist"})
	db.Create(&Role{Name: "Nurse"})
	db.Create(&Role{Name: "Dentist Assistance"})
	db.Create(&Role{Name: "Finance"})
	db.Create(&Role{Name: "Pharmacist"})
}

func setupUser() {
	var dentist Role
	var nuse Role
	var finance Role
	var dentistAssistance Role
	var pharmacist Role

	db.First(&dentist, "Name = ?", "Dentist")
	db.First(&nuse, "Name = ?", "Nurse")
	db.First(&finance, "Name = ?", "Finance")
	db.First(&dentistAssistance, "Name = ?", "Dentist Assistance")
	db.First(&pharmacist, "Name = ?", "Pharmacist")

	db.Create(
		&User{
			Name:     "Som",
			Username: "SomDOC111",
			Password: "SomIAMDENTIST",
			RoleID:   &dentist.ID,
		},
	)

	db.Create(
		&User{
			Name:     "Sam",
			Username: "SamDOC111",
			Password: "SamIAMDENTISTAndNotSOM",
			RoleID:   &dentist.ID,
		},
	)

	db.Create(
		&User{
			Name:     "Mali",
			Username: "NSMali",
			Password: "MaliMaliMali",
			RoleID:   &nuse.ID,
		},
	)

	db.Create(
		&User{
			Name:     "Malee",
			Username: "MaleeAssist",
			Password: "DCassistMall2e",
			RoleID:   &dentistAssistance.ID,
		},
	)

	db.Create(
		&User{
			Name:     "Max",
			Username: "Max007",
			Password: "mmmaaaxxx",
			RoleID:   &finance.ID,
		},
	)

	db.Create(
		&User{
			Name:     "Fundee",
			Username: "funDDfun",
			Password: "fun1998dee",
			RoleID:   &pharmacist.ID,
		},
	)
}

func setupRemedyType() {
	db.Create(
		&RemedyType{
			Name: "ถอนฟัน",
		},
	)

	db.Create(
		&RemedyType{
			Name: "อุดฟัน",
		},
	)

	db.Create(
		&RemedyType{
			Name: "รักษาฟัน",
		},
	)

	db.Create(
		&RemedyType{
			Name: "ขูดหินปูน",
		},
	)
}

func setupScreening() {
	var ds User

	db.First(&ds, "role_id = ?", 2)
	db.Create(
		&Screening{
			Illness: "ปวดฟันเวลากินข้าว",
			User:    ds,
		},
	)

	db.Create(
		&Screening{
			Illness: "แมลกินฟัน",
			User:    ds,
		},
	)
}

func DefaultData() {
	setupRole()
	setupUser()
	setupRemedyType()
	setupScreening()
}
