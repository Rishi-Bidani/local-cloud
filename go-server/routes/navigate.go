package routes

import (
	"path"

	"github.com/Rishi-Bidani/localcloud/functions"
	global "github.com/Rishi-Bidani/localcloud/global"
	"github.com/labstack/echo/v4"
)

func RouteNavigate(c echo.Context) error {
	uploadFolder := global.GetUploadFolder()
	// get requested path
	pathname := path.Join(uploadFolder, c.QueryParam("pathname"))
	// get files and folders
	files, folders, err := functions.GetFilesAndFolders(pathname)

	if err != nil {
		return c.JSON(500, map[string]interface{}{
			"error": "Error getting files and folders",
		})
	}

	return c.JSON(200, map[string]interface{}{
		"files":   files,
		"folders": folders,
	})
}

func SetupNavigateRoutes(router *echo.Group) {
	router.GET("/navigate", RouteNavigate)
}