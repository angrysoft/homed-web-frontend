package ovh.angrysoft.homedbackend.configurations;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ovh.angrysoft.homedbackend.services.UserService;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;

    public OAuth2LoginSuccessHandler(UserService userService) {
        this.userService = userService;
    }

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${frontend.userNotFound}")
    private String userNotFound;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attrs = principal.getAttributes();
        userService.findByEmail(attrs.getOrDefault("email", "").toString()).ifPresentOrElse(
                user -> this.setDefaultTargetUrl(frontendUrl),
                () -> this.setDefaultTargetUrl(userNotFound));

        this.setAlwaysUseDefaultTargetUrl(true);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
