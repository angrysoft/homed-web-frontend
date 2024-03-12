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
    const res = await fetch("http://localhost:8080/api/v1/status", {
      cache: "no-store",
      mode: "cors",
      credentials: "include",
    });
    console.log(res.status, res.ok);
    if (res.ok) {
      console.log("is ok");
      const data = await res.json();
      setUser(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return [loading, user];
}
