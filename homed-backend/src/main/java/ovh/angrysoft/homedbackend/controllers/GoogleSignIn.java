package ovh.angrysoft.homedbackend.controllers;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
public class GoogleSignIn {
    @PostMapping("/api/v1/gsi")
    public Response handleSignIn(@CookieValue("g_csrf_token") String gToken, Token token) {
        Response result = new Response(new GUser("", false, "", "", "", "", ""), "something went wrong");
        if (!gToken.equals(token.g_csrf_token())) {
            return result.withStatus("wrong g_csrf_token");
        }
        Optional<String> clientId = Optional.ofNullable(System.getenv("GOOGLE_CLIENT_ID"));

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections
                        .singletonList(clientId.isPresent() ? clientId.get() : ""))
                .build();

        // (Receive idTokenString by HTTPS POST)

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(token.credential());
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println(idToken);

                // Get profile information from payload
                String email = payload.getEmail();
                boolean emailVerified = payload.getEmailVerified();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                // Use or store profile information
                // ...
                result = new Response(new GUser(email, emailVerified, name, pictureUrl, locale, familyName, givenName),
                        "ok");
            } else {
                result = result.withStatus("Invalid ID token.");
            }
        } catch (GeneralSecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            result = result.withStatus(e.getMessage());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            result = result.withStatus(e.getMessage());

        }

        return result;

    }

}

/**
 * Token
 * String credential, String g_csrf_token
 */
record Token(String credential, String g_csrf_token) {
}

/**
 * Guser
 */
record GUser(
        String email,
        boolean emailVerified,
        String name,
        String pictureUrl,
        String locale,
        String familyName,
        String givenName) {
}

/**
 * Response
 */
record Response(
        GUser result,
        String status) {
    Response withStatus(String newStatus) {
        return new Response(result, newStatus);
    }
}
