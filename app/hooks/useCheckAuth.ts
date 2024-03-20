import { useCallback, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  picture: string;
  emailVerified: boolean;
  isAuthenticated: boolean;
}

export function useCheckAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchState = useCallback(async () => {
    const res = await fetch("/api/v1/status", {
      cache: "no-store",
      mode: "cors",
      credentials: "include",
    });
    console.log(res)
    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // fetchState();
    // TODO : REMOVE THIS
    setUser({name:"seba", email: "seba@bla", picture: "fsdfsf", emailVerified: true, isAuthenticated: true});
    setLoading(false);
  }, [fetchState]);

  return [loading, user];
}
