package mqtt

import (
	"crypto/tls"
	"encoding/json"
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"homedaemon.angrysoft.ovh/web/config"
)

type BrokerClient struct {
	client MQTT.Client
	homeid string
}

func NewClient(conf *config.Config, homeid string, handler MQTT.MessageHandler) BrokerClient {
	opts := MQTT.NewClientOptions().AddBroker(fmt.Sprintf("ssl://%s:%d", conf.Mqtt.Host, conf.Mqtt.Port))
	opts.SetUsername(conf.Mqtt.User).SetPassword(conf.Mqtt.Password)
	opts.SetTLSConfig(&tls.Config{})
	opts.SetDefaultPublishHandler(handler)
	onConnMsg, _ := json.Marshal(map[string]any{
		"event": "request",
		"sid": "deviceManager",
		"payload": map[string]string{
			"name": "devices",
			"value": "list",
		},
	})

	var onConnect MQTT.OnConnectHandler = func(client MQTT.Client) {
		fmt.Println("send request")
		client.Publish(
			fmt.Sprintf("homed/%s/set", homeid),
			0,
			false,
			string(onConnMsg),
		)
	}
	opts.OnConnect = onConnect
	c := MQTT.NewClient(opts)
	if token := c.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("From Connect")
		panic(token.Error())
	}
	if token := c.Subscribe(fmt.Sprintf("homed/%s/get", homeid), 0, nil); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		// os.Exit(1)
	}

	return BrokerClient{client: c, homeid: homeid}
}

func (b *BrokerClient) Close() {
	if token := b.client.Unsubscribe(fmt.Sprintf("homed/%s/get", b.homeid)); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		// os.Exit(1)
	}

	b.client.Disconnect(250)
}

func (b *BrokerClient) Send(msg string) {
	token := b.client.Publish(fmt.Sprintf("homed/%s/set", b.homeid), 0, false, msg)
	go func() {
		token.Wait()
		if token.Error() != nil {
			fmt.Println(token.Error())
		}
	}()
}
