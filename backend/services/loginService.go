package services

import (
	"SA2021_G12/entity"
	"math/rand"
	"strconv"
	"time"
)

type LoginService interface {
	Login(username string, password string)
}

type LoginData struct {
	Username string
	Password string
}

func addAuth(user string) string {
	key := user + "-"

	// generateKey
	rl := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < 12; i++ {
		key += strconv.FormatInt(rl.Int63n(15), 16)
	}

	if err := entity.DB().Create(&entity.Auth{
		Auth: key,
		Date: time.Now(),
	}).Error; err != nil {
		return ""
	}

	return key
}

func (user *LoginData) Login(username string, password string) string {
	if user.Username == username && password == user.Password {
		return addAuth(username)
	}
	return ""
}
