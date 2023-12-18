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
  const places: Set<string> = new Set();
  const lang = getLangCode(navigator.language);
  const devices: { [key: string]: any } = {};
  if (data.length === 0) return;
  data.forEach((dev) => {
    if (!dev.traits || dev.traits.length === 0) return;
    const place = dev.place[lang];
    devices[dev.sid] = {
      ...dev,
      name: dev.name[lang],
      place: place,
    };
    place && places.add(place);
  });
  return { devices: devices, places: Array.from(places) };
};

export { parseDeviceEvent };
