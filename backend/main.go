package main

import (
	"SA2021_G12/controller"
	"SA2021_G12/entity"
	"os"

	"github.com/gin-gonic/gin"
)

var Access []string

func CORSMiddleware() gin.HandlerFunc {

	return func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		context.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		context.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if context.Request.Method == "OPTIONS" {
			context.AbortWithStatus(204)
			return
		}
		context.Next()
	}
}

func main() {
	args := os.Args

	entity.SetupDatabase(len(args) > 1 && args[1] == "-s")

	entity.ClearAuth()

	engine := gin.Default()

	engine.Use(CORSMiddleware())
	engine.POST("/treatmentRecord", controller.CreateTreatmentRecord)
	engine.POST("/login", controller.LoginToSite)
	engine.POST("/auth", controller.CheckAuth)
	engine.GET("/users/:role", controller.ListUsersWithRole)
	engine.GET("/screenings", controller.ListScreenings)
	engine.GET("/remedy_types", controller.ListRemedyType)
	engine.Run()
}
