package controller

import (
	"net/http"

	"github.com/ApisitSamorod/SA62G12/entity"
	"github.com/gin-gonic/gin"
)

// POST /job
func CreateJob(c *gin.Context) {
	var job entity.Job

	if err := c.ShouldBindJSON(&job); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&job).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": job})
}

// GET /jobs

func ListJob(c *gin.Context) {
	var jobs []entity.Job

	if err := entity.DB().Raw("SELECT * FROM jobs").Find(&jobs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": jobs})
}
