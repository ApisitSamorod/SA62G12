package controller

import (
	"SA2021_G12/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /treatmentRecord
func CreateTreatmentRecord(context *gin.Context) {
	var treatmentRecord entity.TreatmentRecord

	var screening entity.Screening
	var dentist entity.User
	var remedy entity.RemedyType

	if err := context.ShouldBindJSON(&treatmentRecord); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", treatmentRecord.DentistID).First(&dentist); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Dentist not found"})
		return
	}

	entity.DB().Joins("Role").Find(&dentist)

	if dentist.Role.Name != "Dentist" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "only for dentsit"})
		return
	}

	if tx := entity.DB().Where("id = ?", treatmentRecord.ScreeningRecordID).First(&screening); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Screening not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", treatmentRecord.RemedyTypeID).First(&remedy); tx.RowsAffected == 0 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "RemedyType not found"})
		return
	}

	treatmentData := entity.TreatmentRecord{
		PrescriptionRaw:  treatmentRecord.PrescriptionRaw,
		PrescriptionNote: treatmentRecord.PrescriptionNote,
		ToothNumber:      treatmentRecord.ToothNumber,
		Date:             treatmentRecord.Date,
		// create with assosiation
		ScreeningRecord: screening,
		Dentist:         dentist,
		RemedyType:      remedy,
	}

	if err := entity.DB().Create(&treatmentData).Error; err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": treatmentData})
}
