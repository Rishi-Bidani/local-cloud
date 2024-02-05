package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	functions "github.com/Rishi-Bidani/localcloud/functions"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func getPort(alternate string) string {
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = alternate
	}
	return PORT
}

// Get preferred outbound ip of this machine
func GetOutboundIP() net.IP {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	return localAddr.IP
}

func prettyPrint(i interface{}) string {
	s, _ := json.MarshalIndent(i, "", "\t")
	return string(s)
}

func main() {
	router := echo.New()
	// Middleware
	router.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} | ${status} | ${latency_human} | ${remote_ip} | ${method} ${uri} \n",
	}))
	router.Use(middleware.Recover())

	// Settings
	_settings, err := functions.ParseSettings("settings.yaml")
	if err != nil {
		log.Fatal(err)
	}
	if _settings == nil {
		log.Fatal("Settings is nil")
	}
	settings := *_settings

	// create base folders if they don't exist
	functions.CreateFolders(settings.Basefolder.(string))

	// TODO: Remove this line
	fmt.Println(prettyPrint(settings))

	// Routes
	router.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	// Start server
	PORT := getPort("5000")
	fmt.Println("[Running on] :: " + GetOutboundIP().String() + ":" + PORT)
	log.Fatal(http.ListenAndServe(":"+PORT, router))
}
