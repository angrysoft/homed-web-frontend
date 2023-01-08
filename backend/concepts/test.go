package main

import (
	"fmt"
	"log"
	"net/http"
)

func handleSSE(messageChan chan string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		log.Printf("Get handshake from client")

		// prepare the header
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// instantiate the channel
		

		// close the channel after exit the function
		defer func() {
			close(messageChan)
			messageChan = nil
			log.Printf("client connection is closed")
		}()

		// prepare the flusher
		flusher, _ := w.(http.Flusher)

		// trap the request under loop forever
		for {

			select {

			// message will received here and printed
			case message := <-messageChan:
				fmt.Fprintf(w, "data: %s\n\n", message)
				flusher.Flush()

			// connection is closed then defer will be executed
			case <-r.Context().Done():
				return

			}
		}

	}
}

func sendMessage(message string, messageChan chan string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if messageChan != nil {
			log.Printf("print message to client")

			// send the message through the available channel
			messageChan <- message
		}

	}
}

func main() {
	messageChan := make(chan string)
	
	http.HandleFunc("/handshake", handleSSE(messageChan))

	http.HandleFunc("/sendmessage", sendMessage("hello client", messageChan))

	log.Fatal("HTTP server error: ", http.ListenAndServe("localhost:5000", nil))
}
