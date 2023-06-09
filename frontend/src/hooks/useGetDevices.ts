import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const result:{[key:string]: any} = {};
    const places: Set<string> = new Set();
    const lang = getLangCode(navigator.language);

    setLoading(true);
    let allDevices: Array<{[key:string]: any}> = [];
    const deviceInfoList: string | null = localStorage.getItem("allDevices");
    if (deviceInfoList != null && deviceInfoList.length > 0)
      allDevices = JSON.parse(deviceInfoList);

    allDevices.forEach((dev) => {
      const place = dev.place[lang]
      result[dev.sid] = {
        ...dev,
        name: dev.name[lang],
        place: place,
      }
      place && places.add(place);
    });

    // localStorage.setItem("allDevices", JSON.stringify(allDevices));
    dispatch({type: "ALL_DEVICES_LOADED", payload: result});
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