package routes

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"

	"github.com/Rishi-Bidani/localcloud/functions"
	"github.com/Rishi-Bidani/localcloud/global"
	"github.com/labstack/echo/v4"
)

func getUploadFolder() string {
	settings := functions.GetSettings(global.SETTINGS_FILE)
	baseFolder := settings.Basefolder.(string)
	uploadFolder := path.Join(baseFolder, "data")
	return uploadFolder
}

func upload(c echo.Context) error {
	// if empty, return error
	if c.Request().ContentLength == 0 {
		return c.String(http.StatusBadRequest, "No file uploaded")
	}

	form, err := c.MultipartForm()
	if err != nil {
		return c.String(401, fmt.Sprint("Error Uploading File"))
	}
	files := form.File["files"]

	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprint("Error Uploading File"))
		}
		defer src.Close()

		// Destination
		dst, err := os.Create(path.Join(getUploadFolder(), file.Filename))
		if err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprint("Error Uploading File"))
		}
		defer dst.Close()

		// Copy
		if _, err = io.Copy(dst, src); err != nil {
			return c.String(http.StatusInternalServerError, fmt.Sprint("Error Uploading File"))
		}
	}
	return c.String(http.StatusOK, fmt.Sprintf("%d files uploaded successfully", len(files)))
}

func SetupUploadRoutes(router *echo.Echo) {
	router.POST("/upload", upload)
}