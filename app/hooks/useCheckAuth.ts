import { useCallback, useEffect, useMemo, useState } from "react";

export interface User {
  name: string;
  email: string;
  picture: string;
  emailVerified: boolean;
  isAuthenticated: boolean;
}

export function useCheckAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authState = useMemo(()=>({ isLoading, user}), [isLoading, user]);

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
    setIsLoading(false);
  }, []);


  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return authState;
}
