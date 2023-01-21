package router

import (
	"net/http"
)

type Router struct {
	routes map[string]*Route
}

type Route struct {
	Path    string
	Handler http.HandlerFunc
}

func New() *Router {
	return &Router{
		routes: make(map[string]*Route),
	}
}

func (rtr *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	route, ok := rtr.routes[r.URL.Path]
	if !ok {
		r.URL.Path = "/"
		route, ok = rtr.routes["/"]
	}

	if ok {
		route.Handler.ServeHTTP(w, r)
		return
	}

	http.NotFound(w, r)

}

func (rtr *Router) AddRoute(path string, handler http.HandlerFunc) {
	route := &Route{
		Path:    path,
		Handler: handler,
	}
	rtr.routes[path] = route
}
