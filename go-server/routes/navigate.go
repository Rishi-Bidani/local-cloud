package routes

import (
	global "github.com/Rishi-Bidani/localcloud/global"
	"github.com/labstack/echo/v4"
)

func navigate(c echo.Context) error {
	uploadFolder := global.GetUploadFolder()
	return c.String(200, uploadFolder)
}