package service

import "golang.org/x/crypto/bcrypt"

type LoginService interface {
	Login(username string, password string)
}

type LoginData struct {
	Username string
	Password string
}

func (user *LoginData) Login(username string, password string) bool {
	return user.Username == username && (bcrypt.CompareHashAndPassword([]byte(password), []byte(user.Password)) == nil)
}