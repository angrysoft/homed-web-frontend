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

const parseDeviceEvent = (data: any[]) => {
  const devices: { [place: string]: DeviceInfo[] } = {};
  const lang = getLangCode(navigator.language);
  if (data.length == 0) return;
  data.forEach((dev) => {
    if (!dev.traits || dev.traits.length === 0) return;
    const place = dev.place[lang];
    if (!devices.hasOwnProperty(place)) devices[place] = [];
    devices[place].push(dev);
  });
  return devices;
};

export { parseDeviceEvent, getLangCode };
