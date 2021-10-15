package controller;

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"SA2021_G12/entity"
);

// GET /users/:role
func ListUsersWithRole(context *gin.Context) {
	var user []entity.User;
	var role entity.Role;

	roleName := context.Param("role");

	entity.DB().First(&role,"Name = ?", roleName);

	if err := entity.DB().Raw("select id, name from users where role_id = ?", role.ID).Scan(&user).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user})
}