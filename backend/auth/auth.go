package auth

import (
	"context"
	"errors"
	"fmt"

	"google.golang.org/api/idtoken"
	"homedaemon.angrysoft.ovh/web/config"
)

func Authenticate(credentials string, conf *config.Config) error {
	ctx := context.Background()
	payload, err := idtoken.Validate(ctx, credentials, "877412399754-shou706hpt8q4llqenm6p93vthr4q28o.apps.googleusercontent.com")
	if err != nil {
		return err
	}

	if payload.Issuer != "accounts.google.com" && payload.Issuer != "https://accounts.google.com" {
		return errors.New("wrong issuer")
	}

	if containsUserSub(conf, payload.Claims["sub"].(string)) {
		fmt.Println("")
	}
	return nil
}

func containsUserSub(conf *config.Config, sub string) bool {
	var result bool
	for _, house := range conf.Houses {
		if result {
			break
		}

		for _, user := range house.Users {
			if user == sub {
				result = true
				break
			}
		}
	}
	return result
}