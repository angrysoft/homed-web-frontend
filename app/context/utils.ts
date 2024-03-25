import { DeviceInfo } from "./DeviceInfo";

const getLangCode = (langCode: string): string => {
  const codes: { [key: string]: string } = {
    "pl-PL": "pl",
    pl: "pl",
    en: "en",
    "en-US": "en",
  };

  return codes[langCode] || "en";
};

const getMainState = (data: any[]) => {
  const devices: { [sid: string]: DeviceInfo } = {};
  const lang = getLangCode(navigator.language);
  const places = new Set<string>();
  

  if (data.length == 0) return;
  data.forEach((dev) => {
    if (!dev.traits || dev.traits.length === 0) return;
    places.add(dev.place[lang]);
    devices[dev.sid] = { ...dev, name: dev.name[lang], place: dev.place[lang] };
  });
  return { places: Array.from(places), devices: devices };
};

export { getMainState, getLangCode };
