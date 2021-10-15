package controller;

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"SA2021_G12/entity"
);

// GET /screenings
func ListScreenings(context *gin.Context) {
	var screenings []entity.Screening;

	if err := entity.DB().Raw("select id from screenings").Scan(&screenings).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": screenings})
}