package ovh.angrysoft.homedbackend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import ovh.angrysoft.homedbackend.models.Device;
import ovh.angrysoft.homedbackend.services.MqttV5Connection;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/devices")
public class DevicesController {
    private final MqttV5Connection mqttConn;
    private SseEmitter sseEmitter;

    DevicesController(MqttV5Connection mqttV5Connection) {
        this.mqttConn = mqttV5Connection;
        String mqttUri = System.getenv("MQTT_URI");
        String mqttUser = System.getenv("MQTT_USER");
        String mqttPassword = System.getenv("MQTT_PASSWORD");
        if (mqttUri == null || mqttUser == null || mqttPassword == null)
            System.err.println("Add Mqtt env settings MQTT_URI MQTT_USER MQTT_PASSWORD");

        this.mqttConn.setUri(mqttUri);
        this.mqttConn.setUser(mqttUser);
        this.mqttConn.setPassword(mqttPassword);
        this.mqttConn.start();
    }

    @GetMapping()
    public Device getDevices() {
        try {
            sseEmitter.send("Registred");
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String topic = String.format("homed/%s/get", "e935ce0b-5c5f-47e1-9c7e-7b52afbfa96a");
        mqttConn.addTopic(topic);
        mqttConn.addSseEmiter(sseEmitter);
        System.out.println(String.format("%s - %s", mqttConn.getTopics(), mqttConn.getSseEmitter()));
        return new Device("Halina", "Roboroc 300");
    }

    @GetMapping(path = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter events() {
        SseEmitter emitter = new SseEmitter();
        this.sseEmitter = emitter;
        return emitter;
    }

    @GetMapping("/refresh")
    public String refreshDevicesList(@RequestParam String param) {
        System.out.println("refresh");
        return "ok";
    }

    @PostMapping()
    public String sendAction(@RequestBody String action) {
        // TODO: process POST request
        System.out.println(action);
        return "ok";
    }

    @GetMapping("/{id}")
    public Device getMethodName(@PathVariable String id) {
        return new Device("Halina", id);
    }

}
