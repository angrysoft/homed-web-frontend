import json
import secrets
from datetime import datetime
from pycouchdb import DatabaseError


class OAuth:
    def __init__(self, srv):
        self.srv = srv
        self.usersdb = self._get_db("google-users")
        self.codesdb = self._get_db("google-codes")
        self.tokensdb = self._get_db("google-tokens")
        self.codes = dict()

    def _get_db(self, dbname):
        if dbname not in self.srv:
            self.srv.create(dbname)
        return self.srv.db(dbname)

    def auth(self, args):
        url = "/user.html"
        if self.verify_redirect_uri(
            args.get("client_id", ""), args.get("redirect_uri", "")
        ):
            code = self.gen_code(args.get("client_id"))
            url = "{}?code={}&state={}".format(
                args.get("redirect_uri", "/user.html"), code, args.get("state")
            )
        return url

    def get_new_token(self, args):
        client_id = args.get("client_id")

        if self.verify_client_secret(
            client_id, args.get("client_secret", "")
        ) and self.verify_code(client_id, args.get("code", "")):
            token = {
                "user_id": client_id,
                "token_type": "Bearer",
                "access_token": self._token(20),
                "refresh_token": self._token(20),
                "expires_in": 3600,
            }

            self.tokensdb[client_id] = token
            return 200, json.dumps(
                {
                    "token_type": token["token_type"],
                    "access_token": token["access_token"],
                    "refresh_token": token["refresh_token"],
                    "expires_in": token["expires_in"],
                }
            )

        return 400, json.dumps({"error": "invalid_grant", "erro_msg": f"client_secret"})

    def refresh_token(self, args):
        err = None
        client_id = args.get("client_id")
        if self.verify_client_secret(client_id, args.get("client_secret", "")):
            token = self.tokensdb.get(client_id)
            if token and token["refresh_token"] == args.get("refresh_token"):
                token["access_token"] = self._token(20)
                self.tokensdb[client_id] = token
                return 200, json.dumps(
                    {
                        "token_type": token["token_type"],
                        "access_token": token["access_token"],
                        "expires_in": token["expires_in"],
                    }
                )
            else:
                err = "token"
        else:
            err = "user_id"

        return 400, json.dumps({"error": "invalid_grant", "erro_msg": f"{err}"})

    def log_by_token(self, auth):
        if auth.find(" ") > 0:
            token_type, token = auth.split(" ", 1)
            try:
                user_tokens = self.tokensdb.find(
                    selector={"access_token": token}, limit=1
                )
                if user_tokens.get("docs"):
                    return True
            except Exception:
                return False
        return False

    def verify_code(self, client_id, code):
        times = int(datetime.now().timestamp())
        user_code = self.codesdb.get(client_id, {})
        if user_code.get("code") == code and (times <= int(user_code["expire"])):
            return True
        return False

    def verify_redirect_uri(self, client_id, redirect_uri):
        user = self.usersdb.get(client_id)
        if user and user.get("redirect_uri") == redirect_uri:
            return True
        return False

    def verify_client_secret(self, client_id, client_secret):
        user = self.usersdb.get(client_id)
        if user and user.get("client_secret") == client_secret:
            return True
        return False

    def gen_code(self, client_id, expire=600):
        new_user_code = {
            "code": self._token(),
            "expire": int(datetime.now().timestamp()) + expire,
        }
        self.codesdb[client_id] = new_user_code
        return new_user_code["code"]

    def json_token(self, exipire=3600):
        pass

    def is_signed(self, client_id):
        pass

    @staticmethod
    def _token(size=10):
        return secrets.token_urlsafe(size)
