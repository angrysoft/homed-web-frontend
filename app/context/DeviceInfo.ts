interface DeviceInfo {
  traits: Array<string>;
  name: {[key:string]: string};
  place: {[key:string]: string};
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
  [placeName: string]: DeviceInfo[];
}

export type { DeviceInfo, IEventData, IDevicesContext };
