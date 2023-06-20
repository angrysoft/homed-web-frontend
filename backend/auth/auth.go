package auth

import (
	"context"
	"errors"

	"google.golang.org/api/idtoken"
	"homedaemon.angrysoft.ovh/web/config"
)

type User struct {
	HomeId        string
	Name          string
	Picture       string
	authenticated bool
}

func (u User) IsAuthenticated() bool {
	return u.authenticated
}

func (u *User) Authenticate(credentials string, conf *config.Config) error {
	ctx := context.Background()
	payload, err := idtoken.Validate(ctx, credentials, conf.GoogleId)
	if err != nil {
		return err
	}

	if payload.Issuer != "accounts.google.com" && payload.Issuer != "https://accounts.google.com" {
		return errors.New("wrong issuer")
	}

	homeid, err := containsUserSub(conf, payload.Claims["sub"].(string))
	if err != nil {
		return err
	}
	u.HomeId = homeid
	u.Name = payload.Claims["name"].(string)
	u.Picture = payload.Claims["picture"].(string)
	u.authenticated = true
	return nil
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
