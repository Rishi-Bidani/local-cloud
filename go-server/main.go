package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	functions "github.com/Rishi-Bidani/localcloud/functions"
	"github.com/Rishi-Bidani/localcloud/global"
	"github.com/Rishi-Bidani/localcloud/routes"

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
	settings := functions.GetSettings(global.SETTINGS_FILE)

	fmt.Println(functions.GetFilesAndFolders("./"))

	router := echo.New()
	// Middleware
	router.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339} | ${status} | ${latency_human} | ${remote_ip} | ${method} ${uri} \n",
	}))
	router.Use(middleware.Recover())

	// create base folders if they don't exist
	functions.CreateFolders(settings.Basefolder.(string))

	// Routes
	router.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	api := router.Group("/api")

	routes.SetupUploadRoutes(api)

	// Start server
	PORT := getPort("5000")
	fmt.Println("[Running on] :: " + GetOutboundIP().String() + ":" + PORT)
	log.Fatal(http.ListenAndServe(":"+PORT, router))
}
