package config

import (
	"encoding/json"
	"io"
	"log"
	"os"
)

type mqttBroker struct {
	Host     string `json:"host"`
	Port     uint `json:"port"`
	Ssl      bool `json:"ssl"`
	User     string `json:"user"`
	Password string `json:"password"`
}

type house struct {
	Id     string `json:"id"`
	Name   string `json:"name"`
	Users  []string `json:"users"`
}

type Config struct {
	Mqtt mqttBroker `json:"mqtt"`
	Houses []house `json:"houses"`
}

func LoadFromFile(fileName string) Config {
	var result Config
	jsonFile, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer jsonFile.Close()
	byteValue, _ := io.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &result)
	
	return result
}