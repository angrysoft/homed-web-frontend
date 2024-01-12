package ovh.angrysoft.homedbackend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class Login {
    @Value("${frontend.login}")
    String frontendLogin;

    @GetMapping("/api/v1/login")
    public RedirectView getLogin(@RequestParam String param) {
        return new RedirectView(frontendLogin);
    }

}
