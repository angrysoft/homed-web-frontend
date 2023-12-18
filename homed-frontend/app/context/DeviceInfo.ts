interface DeviceInfo {
  traits: Array<string>;
  name: string;
  place: string;
  model: string;
  sid: string;
  [key: string]: any;
}

interface IDevices {
  [key: string]: DeviceInfo;
}

interface IEventData {
  sid: string;
  payload: {
    deviceList: DeviceInfo[];
  };
}

interface IDevicesContext {
  devices: IDevices;
  places: string[];
}


export type { DeviceInfo, IDevices, IEventData, IDevicesContext }