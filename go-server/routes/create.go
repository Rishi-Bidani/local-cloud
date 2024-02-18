package routes

import (
	"archive/zip"
	"fmt"
	"net/http"
	"os"
	"path"

	global "github.com/Rishi-Bidani/localcloud/global"
	"github.com/labstack/echo/v4"
)


func RouteCreateFolder(c echo.Context) error {
	// TODO: Implement CreateFolder
	uploadFolder := global.GetUploadFolder()
	// get requested path
	pathname := path.Join(uploadFolder, c.QueryParam("pathname"))
	folderName := c.FormValue("folderName")
	fullPath := path.Join(pathname, folderName)

	fmt.Println(fullPath)
	
	return c.JSON(200, map[string]string{"message": "Folder created"})
	// // create the folder
	// err := os.Mkdir(fullPath, 0755)
	// if err != nil {
	// 	return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	// }
}

func addFiles(w *zip.Writer, basePath, baseInZip string) {
    // Open the Directory
    files, err := os.ReadDir(basePath)
    if err != nil {
        fmt.Println(err)
    }

	// iterate through the files in the directory 
	// 		- if they are files, add them to the zip, 
	// 		- if they are directories, recurse
    for _, file := range files {
        if !file.IsDir() {
            dat, err := os.ReadFile(basePath + file.Name())
            if err != nil {
                fmt.Println(err)
            }

            // Add some files to the archive.
            f, err := w.Create(baseInZip + file.Name())
            if err != nil {
                fmt.Println(err)
            }
            _, err = f.Write(dat)
            if err != nil {
                fmt.Println(err)
            }
        } else if file.IsDir() {
            // Recurse
            newBase := basePath + file.Name() + "/"
            addFiles(w, newBase, baseInZip  + file.Name() + "/")
        }
    }
}

func CreateZip(folderPath string) error {
    // Get a Buffer to Write To
    outFile, err := os.Create(folderPath + ".zip")
    if err != nil {
        fmt.Println(err)
    }
    defer outFile.Close()

    // Create a new zip archive.
    w := zip.NewWriter(outFile)

    // Add some files to the archive.
    addFiles(w, folderPath, "")

    if err != nil {
        fmt.Println(err)
    }

    // Make sure to check the error on Close.
    err = w.Close()
    if err != nil {
        fmt.Println(err)
    }
	
	return nil
}

func RouteCreateZip(c echo.Context) error {
	pathname := c.Request().Form.Get("pathname")
	// create the zip
	err := CreateZip(pathname)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error creating zip file")
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Zip created"})
}

func SetupCreateRoutes(router *echo.Group) {
	router.POST("/folder", RouteCreateFolder)
	router.POST("/zip", RouteCreateZip)
}