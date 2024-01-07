package ovh.angrysoft.homedbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;


@SpringBootApplication
@ConfigurationPropertiesScan
public class HomedBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HomedBackendApplication.class, args);
    }
}
