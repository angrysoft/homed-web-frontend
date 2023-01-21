package main

import (
	// "encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"homedaemon.angrysoft.ovh/web/auth"
	"homedaemon.angrysoft.ovh/web/config"
	"homedaemon.angrysoft.ovh/web/mqtt"
	"homedaemon.angrysoft.ovh/web/router"
)

func devices(mqttHandlers map[string]func(string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/devices" {
			http.Error(w, "404 not found.", http.StatusNotFound)
			return
		}
		homeid := "e935ce0b-5c5f-47e1-9c7e-7b52afbfa96a"

		switch r.Method {
		case "GET":
			// mqttHandlers[homeid](string('{"":""}'))
			fmt.Fprint(w, "refresh device list")
		case "POST":
			defer r.Body.Close()
			msg, err := io.ReadAll(r.Body)
			if err != nil {
				log.Fatal(err)
			}
			mqttHandlers[homeid](string(msg))
			fmt.Fprint(w, "ok")
		}
	}
}

func sse(conf *config.Config, mqttHandlers map[string]func(string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		eventCh := make(chan []byte)

		var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
			eventCh <- msg.Payload()
		}
		homeid := "e935ce0b-5c5f-47e1-9c7e-7b52afbfa96a"
		client := mqtt.NewClient(conf, homeid, f)
		mqttHandlers[homeid] = client.Send
		w.Header().Set("Content-Type", "text/event-stream")
		// w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Cache-Control", "no-transform")
		w.Header().Set("Connection", "keep-alive")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		defer func() {
			if eventCh != nil {
				close(eventCh)
				eventCh = nil
			}
			delete(mqttHandlers, homeid)
			client.Close()
			log.Printf("client connection is closed")
		}()

		flusher, _ := w.(http.Flusher)

		for {
			select {
			case message := <-eventCh:
				fmt.Fprintf(w, "data: %s\n\n", message)
				flusher.Flush()
			case <-r.Context().Done():
				return
			}
		}
	}
}

func frontend() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("../frontend/build")).ServeHTTP(w, r)
	}
}

func signin(conf *config.Config, user *auth.User) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			fmt.Println("Singin get")
		case "POST":
			err := r.ParseForm()
			if err != nil {
				log.Fatal(err)
			}
			csrf_token_cookie, cookiErr := r.Cookie("g_csrf_token")
			csrf_token_body := r.PostForm.Get("g_csrf_token")

			if cookiErr != nil || csrf_token_cookie.Value != csrf_token_body {
				log.Print("Failed to verify double submit cookie.")
				w.WriteHeader(http.StatusBadRequest)
			}

			err = user.Authenticate(r.PostForm.Get("credential"), conf)
			if err != nil {
				log.Print(err)
				w.WriteHeader(http.StatusForbidden)
			}
			fmt.Println(user)
			http.Redirect(w, r, "/", http.StatusPermanentRedirect)
		}
	}
}

func main() {
	mqttHandlers := make(map[string]func(string))
	conf := config.LoadFromFile("/home/seba/workspace/homedaemon-web/homemanager.json")
	user := &auth.User{}
	r := router.CreateRouter()
	r.AddRoute("/", frontend())
	r.AddRoute("/auth", signin(&conf, user))
	r.AddRoute("/events", sse(&conf, mqttHandlers))
	r.AddRoute("/devices", devices(mqttHandlers))

	log.Fatal(http.ListenAndServe(":8000", r))
}
