package main;

import (
	"SA2021_G12/entity"
	"SA2021_G12/controller"
	"github.com/gin-gonic/gin"
);

func CORSMiddleware() gin.HandlerFunc {

	return func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*");
		context.Writer.Header().Set("Access-Control-Allow-Credentials", "true");
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With");
		context.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT");

		if context.Request.Method == "OPTIONS" {
			context.AbortWithStatus(204);
			return;
		}
		context.Next();
	};
}

func main() {
	entity.SetupDatabase();

	engine := gin.Default();

	engine.Use(CORSMiddleware());
	engine.POST("/treatmentRecord", controller.CreateTreatmentRecord);
	engine.GET("/users/:role", controller.ListUsersWithRole);
	engine.GET("/screenings", controller.ListScreenings);
	engine.GET("/remedy_types", controller.ListRemedyType);
	engine.Run();
}
