package ovh.angrysoft.homedbackend.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mqtt")
public record MqttProperties(String uri, String user, String password) {
}
