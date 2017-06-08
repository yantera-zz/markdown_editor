package main

import (
	"github.com/labstack/echo"
	"html/template"
	"io"
	"net/http"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

// サイトで共通情報
type ServiceInfo struct {
	Title string
}

var serviceInfo = ServiceInfo{
	"MarkDown Editor",
}

func main() {

	t := &Template{
		templates: template.Must(template.ParseGlob("index.html")),
	}

	e := echo.New()

	e.Static("dist", "dist")

	e.Renderer = t

	e.GET("/top", func(c echo.Context) error {
		// テンプレートに渡す値
		data := struct {
			ServiceInfo
			Content string
		}{
			ServiceInfo: serviceInfo,
			Content:     "using vue.js and golang",
		}
		return c.Render(http.StatusOK, "top", data)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
