package ovh.angrysoft.homedbackend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ovh.angrysoft.homedbackend.models.User;

@Service
public class UserService {

    public Optional<User> findByEmail(String email) {
        Optional<User> result = Optional.empty();
        if (email.equals("sebastian.zwierzchowski@gmail.com"))
            result = Optional.of(new User(email));
        return result;
    }

}
