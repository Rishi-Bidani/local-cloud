package functions

import (
	"log"
	"os"
	"path/filepath"
)

func CreateFolders(baseFolder string) {
	rootFolders := []string{"data", "temp"}
	categoryFolders := []string{"pictures", "videos", "documents", "music"}

	for _, folder := range rootFolders {
		err := os.MkdirAll(filepath.Join(baseFolder, folder), os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
	}

	for _, category := range categoryFolders {
		err := os.MkdirAll(filepath.Join(baseFolder, "data", category), os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
	}
}
