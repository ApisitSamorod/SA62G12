package controller

import (
	"SA2021_G12/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /screenings

func ListScreenings(context *gin.Context) {
	var screenings []entity.Screening

	if err := entity.DB().Joins("User").
		Find(&screenings).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": screenings})
}

// GET /scrrenings_no_treatment
func ListScreeningsNoTreatment(context *gin.Context) {
	var screenings []entity.Screening

	if err := entity.DB().Joins("User").
		Find(&screenings).Where("").Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": screenings})
}