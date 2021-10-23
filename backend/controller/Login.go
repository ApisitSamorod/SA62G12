package controller

import (
	"SA2021_G12/entity"
	"SA2021_G12/services"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type UserData struct {
	RoleID   *uint
	ID       uint
	Name     string
	RoleName string
	Key      string
}

// POST /Login
// user login from login page
func LoginToSite(context *gin.Context) {
	var data services.LoginData
	var user entity.User
	if err := context.ShouldBindJSON(&data); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("username = ?", data.Username).First(&user); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "rejected"})
		return
	}

	if key := data.Login(user.Username, user.Password); key != "" { // so we find a user
		entity.DB().Joins("Role").Find(&user)

		userData := UserData{
			Name:     user.Name,
			RoleName: user.Role.Name,
			RoleID:   user.RoleID,
			ID:       user.ID,
			Key:      key,
		}

		context.JSON(http.StatusOK, gin.H{"data": userData})
	} else {
		context.JSON(http.StatusBadRequest, gin.H{"error": "rejected"})
	}
}

// POST /auth
func CheckAuth(context *gin.Context) {
	var data UserData
	var user entity.User

	// recives key from body
	if err := context.ShouldBindJSON(&data); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// check if key are available in database
	if tx := entity.DB().Where("auth = ?", data.Key).First(&entity.Auth{}); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "no matched auth key"})
		return
	}

	user_name := strings.Split(data.Key, "-")

	// return user data back
	if tx := entity.DB().Where("username = ?", user_name[0]).First(&user); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "auth doesn't match some how"})
		return
	}

	entity.DB().Joins("Role").Find(&user)

	data.Name = user.Name
	data.ID = user.ID
	data.RoleID = user.RoleID
	data.RoleName = user.Role.Name
	data.Key = ""

	context.JSON(http.StatusOK, gin.H{"data": data})
}
