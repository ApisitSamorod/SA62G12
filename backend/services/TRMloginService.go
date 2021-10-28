package services

type LoginService interface {
	Login(username string, password string)
}

type LoginData struct {
	Username string
	Password     string
}

func (user *LoginData) Login(username string, password string) bool {
	return user.Username == username && password == user.Password
}
