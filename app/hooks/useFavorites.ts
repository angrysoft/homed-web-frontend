"use client";
import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (deviceSid: string) => {
    let newValue = [];
    if (favorites.includes(deviceSid)) {
      newValue = favorites.filter((el) => el !== deviceSid);
    } else {
      newValue = Array.from(new Set([...favorites, deviceSid]));
    }
    setFavorites(newValue);
    localStorage.setItem("favorites", newValue.join(","));
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
    toggleFavorite: toggleFavorite,
  };
}
