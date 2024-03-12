import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
  let localInitialState = initialState;
  const savedState = localStorage.getItem(key);
  console.log("savedState", savedState, initialState);

  if (savedState) {
    localInitialState = JSON.parse(savedState);
  }
  
  const [data, setData] = useState<T>(localInitialState);

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
