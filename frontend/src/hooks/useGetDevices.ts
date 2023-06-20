import { useContext, useEffect } from "react";
import { AppContext } from "../store";


const useGetDevices = () => {
  const {state, dispatch} = useContext(AppContext);
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

    if (state.main.deviceList.length === 0)
      return;
    dispatch({type: "LOADING_TRUE"});
    state.main.deviceList.forEach((dev) => {
      if (!dev.traits || dev.traits.length === 0)
        return;
      const place = dev.place[lang]
      result[dev.sid] = {
        ...dev,
        name: dev.name[lang],
        place: place,
      }
      place && places.add(place);
    });
    dispatch({type:"REFRESH_NEEDED_FALSE"});
    dispatch({type: "ALL_DEVICES_LOADED", payload: result});
    dispatch({type: "PLACES_LOADED", payload: Array.from(places)});
    const placeSelected = localStorage.getItem('placeSelected');
    if (placeSelected) {
      dispatch({type: "PLACE_SELECTED", payload: placeSelected})
    }
    dispatch({type: "LOADING_FALSE"});

  }, [dispatch, state.main.deviceList]);

}

export {useGetDevices};