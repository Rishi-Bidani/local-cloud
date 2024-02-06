package global

import (
	"path"

	functions "github.com/Rishi-Bidani/localcloud/functions"
)

func GetUploadFolder() string {
	settings := functions.GetSettings(SETTINGS_FILE)
	baseFolder := settings.Basefolder.(string)
	uploadFolder := path.Join(baseFolder, "data")
	return uploadFolder
}
