package test

import (
	"os"
	"path"
	"testing"

	"archive/zip"

	"github.com/Rishi-Bidani/localcloud/routes"
	"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {
	t.Run("CreateZip", func(t *testing.T) {
		// delete functions.zip if it exists
		_ = os.Remove(path.Join("..", "functions.zip"))
		// create the zip
		err := routes.CreateZip(path.Join("..", "functions"))
		if err != nil {
			t.Errorf("Error creating zip")
		}
		// check if the zip contains all the files inside functions folder
		filesInFunctions, err := os.ReadDir(path.Join("..", "functions"))
		if err != nil {
			t.Errorf("Error reading functions folder")
		}

		// iterate over the files in the zip
		filesInZip, err := zip.OpenReader(path.Join("..", "functions.zip"))
		if err != nil {
			t.Errorf("Error reading zip")
		}
		// get all file names in fileInFunctions
		var fileNamesInFunctions []string
		for _, file := range filesInFunctions {
			fileNamesInFunctions = append(fileNamesInFunctions, file.Name())
		}

		// get all file names in filesInZip
		var fileNamesInZip []string
		for _, file := range filesInZip.File {
			fileNamesInZip = append(fileNamesInZip, file.Name)
		}

		// check if the files in the zip are the same as the files in the functions folder
		assert.ElementsMatch(t, fileNamesInFunctions, fileNamesInZip)
	})	
	// TODO: create a zip file of a folder with subfolders and files
}