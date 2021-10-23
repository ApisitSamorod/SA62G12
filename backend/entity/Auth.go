package entity

import "time"

type Auth struct {
	ID uint
	Auth string
	Date time.Time
}

func ClearAuth() {
	DB().Exec("DELETE FROM Auths")
}