package auth

import (
	"context"
	"errors"

	"google.golang.org/api/idtoken"
	"homedaemon.angrysoft.ovh/web/config"
)

type User struct {
	Homeid string
	Name string
	Picture string
	authenticated bool
}

func (u User) IsAuthenticated() bool {
	return u.authenticated
}


func Authenticate(credentials string, conf *config.Config) (User, error) {
	ctx := context.Background()
	user := User{}
	payload, err := idtoken.Validate(ctx, credentials, "877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com")
	if err != nil {
		return user, err
	}

	if payload.Issuer != "accounts.google.com" && payload.Issuer != "https://accounts.google.com" {
		return user, errors.New("wrong issuer")
	}

	homeid, err := containsUserSub(conf, payload.Claims["sub"].(string))
	if err != nil {
		return user, err
	}
		user.Homeid = homeid
		user.Name = payload.Claims["name"].(string)
		user.Picture = payload.Claims["picture"].(string)
	return user, nil
}

func containsUserSub(conf *config.Config, sub string) (string, error) {
	var homeid string = ""

	for _, house := range conf.Houses {
		
		for _, user := range house.Users {
			if user == sub {
				return house.Id, nil
			}
		}
	}
	return homeid, errors.New("User not found in houses")
}
