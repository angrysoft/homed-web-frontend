import { useContext, useEffect, useState } from "react";
import {allDevices} from "../all";
import { AppContext } from "../store";


const useGetDevices = () => {
  const {state, dispatch} = useContext(AppContext);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const getLangCode = (langCode: string): string => {
    const codes: {[key:string]: string} = {
      "pl-PL": "pl",
      "pl": "pl",
      "en": "en",
      "en-US": "en"
    };

    return codes[langCode] || "en";
  }
  useEffect(() => {
    const result:{[key:string]: any} = {};
    const places: Set<string> = new Set();
    const lang = getLangCode(navigator.language);

    setLoading(true);
    allDevices.forEach((dev) => {
      const place = dev.place[lang]
      result[dev.sid] = {
        ...dev,
        name: dev.name[lang],
        place: place,
      }
      place && places.add(place);
    });
    dispatch({type: "PLACES_LOADED", payload: Array.from(places)});
    const placeSelected = localStorage.getItem('placeSelected');
    if (placeSelected) {
      dispatch({type: "PLACE_SELECTED", payload: placeSelected})
    }
    setLoading(false);
  }, []);

  return {loading}
}

export {useGetDevices};