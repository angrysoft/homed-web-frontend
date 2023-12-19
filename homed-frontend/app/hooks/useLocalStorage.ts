import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    const itemString = localStorage.getItem(key);
    try {
      if (itemString) setData(JSON.parse(itemString));
    } catch (error) {
      console.error("error: ", error, itemString);
    }
  }, [key]);

  useEffect(() => {
    if (!data) return;
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
