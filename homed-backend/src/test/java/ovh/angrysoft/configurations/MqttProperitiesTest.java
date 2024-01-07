package ovh.angrysoft.configurations;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ovh.angrysoft.homedbackend.configurations.MqttProperties;

@SpringBootTest
class MqttProperitiesTest {
    @Autowired
    MqttProperties props;

    @Test
    void showMqttProps() {
        System.out.println(props);
    }
}
