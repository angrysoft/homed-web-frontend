module homedaemon.angrysoft.ovh/web

go 1.19

replace homedaemon.angrysoft.ovh/web/config => ./config

replace homedaemon.angrysoft.ovh/web/mqtt => ./mqtt

require (
	github.com/eclipse/paho.mqtt.golang v1.4.2
	github.com/gorilla/sessions v1.2.1
	homedaemon.angrysoft.ovh/web/auth v0.0.0-00010101000000-000000000000
	homedaemon.angrysoft.ovh/web/config v0.0.0-00010101000000-000000000000
	homedaemon.angrysoft.ovh/web/mqtt v0.0.0-00010101000000-000000000000
)

require (
	cloud.google.com/go/compute v1.14.0 // indirect
	cloud.google.com/go/compute/metadata v0.2.3 // indirect
	github.com/golang/groupcache v0.0.0-20200121045136-8c9f03a8e57e // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/googleapis/enterprise-certificate-proxy v0.2.1 // indirect
	github.com/gorilla/securecookie v1.1.1 // indirect
	github.com/gorilla/websocket v1.4.2 // indirect
	go.opencensus.io v0.24.0 // indirect
	golang.org/x/net v0.0.0-20221014081412-f15817d10f9b // indirect
	golang.org/x/oauth2 v0.0.0-20221014153046-6fdb5e3db783 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/sys v0.0.0-20220728004956-3c1f35247d10 // indirect
	golang.org/x/text v0.5.0 // indirect
	google.golang.org/api v0.106.0 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/genproto v0.0.0-20221227171554-f9683d7f8bef // indirect
	google.golang.org/grpc v1.51.0 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
)

replace homedaemon.angrysoft.ovh/web/auth => ./auth
