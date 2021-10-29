package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/ApisitSamorod/SA62G12/entity"
	"github.com/ApisitSamorod/SA62G12/services"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type UserData struct {
	RoleID   *uint
	ID       uint
	Name     string
	RoleName string
}

const trm_secretKey = "TMRJWT"

// POST /Login
// user login from login page
func TRM_LoginToSite(context *gin.Context) {
	var data services.LoginData
	var user entity.User
	if err := context.ShouldBindJSON(&data); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("username = ?", data.Username).First(&user); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "no match user"})
		return
	}

	if !data.Login(user.Username, user.Password) { // so we find a user
		context.JSON(http.StatusBadRequest, gin.H{"error": "incorect username or password"})
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(trm_secretKey))

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "can't authorize credential"})
		return
	}

	http.SetCookie(context.Writer, &http.Cookie{
		Name:     "g12_auth",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
	})

	context.JSON(http.StatusOK, gin.H{"data": "successfully loggedin"})
}

// POST /auth
func TRM_CheckAuth(context *gin.Context) {
	var data UserData
	var user entity.User

	cookie, _ := context.Cookie("g12_auth")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(trm_secretKey), nil
	})

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "no matched credential"})
		return
	}

	claims := token.Claims.(*jwt.StandardClaims)

	entity.DB().Joins("Role").Where("users.id =?", claims.Issuer).First(&user)

	data = UserData{
		Name:     user.Name,
		ID:       user.ID,
		RoleID:   &user.Role.ID,
		RoleName: user.Role.Name,
	}

	context.JSON(http.StatusOK, gin.H{"data": data})
}

func TRM_Logout(context *gin.Context) {
	cookie, _ := context.Cookie("g12_auth")

	fmt.Println(cookie)

	http.SetCookie(context.Writer, &http.Cookie{
		Name:     "g12_auth",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	})

	context.JSON(http.StatusOK, gin.H{"data": "logged out"})
}
