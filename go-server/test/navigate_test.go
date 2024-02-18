package test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Rishi-Bidani/localcloud/routes"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestNavigate(t *testing.T){

	e := echo.New()
	
	t.Run("NavigateNone", func(t *testing.T){
		// Test the navigate route
		req := httptest.NewRequest(http.MethodGet, "/navigate?pathname=/", nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)
		// Call the function
		if assert.NoError(t, routes.RouteNavigate(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
			assert.Equal(t, `{"files":[],"folders":[]}`, rec.Body.String())
		}
		
	})
}