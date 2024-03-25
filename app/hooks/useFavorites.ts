"use client";
import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (deviceSid: string) => {
    const newValue = Array.from(new Set([...favorites, deviceSid]));
    setFavorites(newValue);
    savePersistence(newValue);
  };

  const removeFavorite = (deviceSid: string) => {
    const newValue = favorites.filter((el) => el !== deviceSid);
    setFavorites(newValue);
    savePersistence(newValue);
  };

  const savePersistence = (value: string[]) => {
    localStorage.setItem("favorites", value.join(","));
  };

  useEffect(() => {
    const itemString = localStorage.getItem("favorites");
    try {
      if (itemString) setFavorites(itemString.split(","));
    } catch (error) {
      console.error("error: ", error, itemString);
    }
  }, []);

  return {
    favorites: favorites,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
}
