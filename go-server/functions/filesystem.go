package functions

import (
	"os"
)

type File struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
}

func GetFilesAndFolders(path string) ([]File, []string, error) {
	files := []File{}
	folders := []string{}

	// check if path exists
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return nil, nil, err
	}

	// read the directory at the given path
	dir, err := os.ReadDir(path)
	if err != nil {
		return nil, nil, err
	}

	// iterate over the directory
	for _, file := range dir {
		// if it's a directory, add it to the folders slice
		if file.IsDir() {
			// APPEND FOLDER ===============================
			folders = append(folders, file.Name())
		} else {
			// APPEND FILE =================================
			fileInfo, err := file.Info()
			if err != nil {
				return nil, nil, err
			}

			files = append(files, File{
				Name: file.Name(),
				Size: fileInfo.Size(),
			})
		}
	}

	return files, folders, nil
}
