package controller;

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"SA2021_G12/entity"
);

// GET /remedy_types
func ListRemedyType(context *gin.Context) {
	var remedy_types []entity.RemedyType;

	if err := entity.DB().Raw("select id, name from remedy_types").Scan(&remedy_types).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": remedy_types})
}