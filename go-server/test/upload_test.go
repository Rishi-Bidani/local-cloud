package test

import (
	"bytes"
	"io"
	"mime"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func HandleFile(w http.ResponseWriter, r *http.Request) {
    mediaType, params, _ := mime.ParseMediaType(r.Header.Get("Content-Type"))
    if strings.HasPrefix(mediaType, "multipart/") {
        multipartReader := multipart.NewReader(r.Body, params["boundary"])
        filePart, _ := multipartReader.NextPart()
        // pay attention here when you read large file
        data, _ := io.ReadAll(filePart)
        w.Write(data)
        return
    }
    w.WriteHeader(http.StatusBadRequest)
    w.Write([]byte("request is not multipart"))
}

func TestHandleFile(t *testing.T) {
    t.Run("MultipartRequest", func(t *testing.T) {
        // instantiate multipart request
        var buf bytes.Buffer
        multipartWriter := multipart.NewWriter(&buf)
        defer multipartWriter.Close()

        // add form field
        filePart, _ := multipartWriter.CreateFormFile("files", "file.txt")
        filePart.Write([]byte("Hello, World!"))

        r := httptest.NewRequest(http.MethodPost, "/upload", &buf)
        w := httptest.NewRecorder()

        r.Header.Set("Content-Type", multipartWriter.FormDataContentType())

        HandleFile(w, r)

        data, _ := io.ReadAll(w.Result().Body)
        assert.Equal(t, http.StatusOK, w.Result().StatusCode)
        assert.Equal(t, []byte("Hello, World!"), data)
    })

    t.Run("PlainRequest", func(t *testing.T) {
        r := httptest.NewRequest(http.MethodPost, "/upload", nil)
        w := httptest.NewRecorder()

        HandleFile(w, r)

        assert.Equal(t, http.StatusBadRequest, w.Result().StatusCode)
    })
}