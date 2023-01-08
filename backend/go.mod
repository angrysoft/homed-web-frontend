module homedaemon.angrysoft.ovh/web

go 1.19

replace homedaemon.angrysoft.ovh/web/config => ./config

require (
	github.com/eclipse/paho.mqtt.golang v1.4.2
	google.golang.org/api v0.106.0
	homedaemon.angrysoft.ovh/web/config v0.0.0-00010101000000-000000000000
	homedaemon.angrysoft.ovh/web/mqtt v0.0.0-00010101000000-000000000000
)

require (
	cloud.google.com/go/compute v1.15.0 // indirect
	cloud.google.com/go/compute/metadata v0.2.3 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/googleapis/enterprise-certificate-proxy v0.2.1 // indirect
	github.com/gorilla/websocket v1.4.2 // indirect
	go.opencensus.io v0.24.0 // indirect
	golang.org/x/net v0.5.0 // indirect
	golang.org/x/oauth2 v0.4.0 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/sys v0.4.0 // indirect
	golang.org/x/text v0.6.0 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/genproto v0.0.0-20230106154932-a12b697841d9 // indirect
	google.golang.org/grpc v1.51.0 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
)

replace homedaemon.angrysoft.ovh/web/mqtt => ./mqtt
