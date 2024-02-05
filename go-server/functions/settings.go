package functions

import (
	"log"
	"os"
	"path"

	"gopkg.in/yaml.v2"
)

type SettingsAccount struct {
	Password    string `yaml:"password"`
	Permissions struct {
		CreateFolder bool `yaml:"createFolder"`
		Upload       bool `yaml:"upload"`
		Download     bool `yaml:"download"`
		Delete       bool `yaml:"delete"`
		Navigate     bool `yaml:"navigate"`
	} `yaml:"permissions"`
	Hide []string `yaml:"hide"`
	Show []string `yaml:"show"`
}

type Settings struct {
	Production bool        `yaml:"production"`
	Basefolder interface{} `yaml:"basefolder"`
	Secretkey  string      `yaml:"secretkey"`
	Accounts   struct {
		Admin struct {
			Password string `yaml:"password"`
		} `yaml:"admin"`

		GuestAccounts map[string]SettingsAccount `yaml:"guestaccounts"`
	} `yaml:"accounts"`
}

func parseSettings(filepath string) (*Settings, error) {
	settings := &Settings{}

	yamlFile, err := os.ReadFile(filepath)
	if err != nil {
		log.Fatal(err)
	}

	err = yaml.Unmarshal(yamlFile, settings)
	if err != nil {
		return nil, err
	}

	// if basefolder is not set, set it to the current directory if production is false else set it to the home directory
	if settings.Basefolder == nil {
		if settings.Production {
			settings.Basefolder = os.Getenv("HOME")
		} else {
			settings.Basefolder, err = os.Getwd()
			if err != nil {
				return nil, err
			}
		}
	}
	// basefolder += "/localcloud"
	settings.Basefolder = path.Join(settings.Basefolder.(string), "localcloud")

	return settings, nil
}


func GetSettings(filepath string) Settings {
	// Settings
	_settings, err := parseSettings(filepath)
	if err != nil {
		log.Fatal(err)
	}
	if _settings == nil {
		log.Fatal("Settings is nil")
	}
	return *_settings
}