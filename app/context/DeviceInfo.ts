interface DeviceInfo {
  traits: Array<string>;
  name: string;
  place: string;
  model: string;
  sid: string;
  [key: string]: any;
}

interface IEventData {
  sid: string;
  payload: {
    deviceList: DeviceInfo[];
  };
}


interface IDevicesContext {
  places: Array<string>;
  devices: {[sid: string]: DeviceInfo};
}

export type { DeviceInfo, IEventData, IDevicesContext };
