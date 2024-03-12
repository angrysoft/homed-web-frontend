package ovh.angrysoft.homedbackend.controllers;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class User {

    @GetMapping("/api/v1/status")
    public UserResp status() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            var principal = (OAuth2User) authentication.getPrincipal();
            return new UserResp(principal.getAttribute("name"),
                    principal.getAttribute("email"),
                    principal.getAttribute("picture"),
                    principal.getAttribute("email_verified"),
                    true);
        }
        return null;
    }

}

record UserResp(String name, String email, String picture, boolean emailVerified, boolean isAuthenticated) {
}