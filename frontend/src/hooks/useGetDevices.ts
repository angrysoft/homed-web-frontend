import { useContext, useEffect, useState } from "react";
import {allDevices} from "../all";
import { AppContext } from "../store";


const useGetDevices = () => {
  const {dispatch} = useContext(AppContext);
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

  const evSource = new EventSource(`/events`);
  evSource.onmessage = async (event) => {
    if (event.data.startsWith('{')) {
      dispatch({type:"UPDATE_DEVICE", payload: JSON.parse(event.data)});
    }
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
    dispatch({type: "ALL_DEVICES_LOADED", payload: result})
    dispatch({type: "PLACES_LOADED", payload: Array.from(places)});
    const placeSelected = localStorage.getItem('placeSelected');
    if (placeSelected) {
      dispatch({type: "PLACE_SELECTED", payload: placeSelected})
    }
    setLoading(false);
  }, [dispatch]);

  return {loading}
}

export {useGetDevices};