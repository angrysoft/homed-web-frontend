import json
import pprint
from pycouchdb import Server


def get_devices_list():
    srv = Server()
    devicesdb = srv.db("devices")
    scenedb = srv.db("scenes")
    devices_list = list()
    for dev in devicesdb:
        model = dev.get("model")
        devinfo = None
        if model in ["bslamp1", "color"]:
            devinfo = Bslamp1(dev)
        elif model == "ctrl_neutral1":
            devinfo = Ctrl1(dev)
        elif model == "ctrl_neutral2":
            devinfo = Ctrl2(dev, 0)
            devinfo.id += ".0"
            devinfo.name["name"] += " channel 0"
            devices_list.append(devinfo.sync())
            devinfo = Ctrl2(dev, 1)
            devinfo.id += ".1"
            devinfo.name["name"] += " channel 1"
        elif model == "plug":
            devinfo = Plug(dev)
        elif model == "bravia":
            pass

        if devinfo:
            devices_list.append(devinfo.sync())
    for scene in scenedb:
        if scene.get("automatic") == False:
            sc = Scene(scene)
            devices_list.append(sc.sync())

    return devices_list


class QueryDevice:
    def __init__(self, sid):
        srv = Server()
        self.devdb = srv.db("devices")
        self.scenedb = srv.db("scenes")
        self.datadb = srv.db("devices-data")
        self.channel = None
        self.sid = sid
        if sid[-2] == ".":
            self.sid, self.channel = sid.rsplit(".", 1)

    def query(self):
        if self.sid in self.datadb:
            dev = self.devdb.get(self.sid)
            devdata = self.datadb.get(self.sid)
            model = dev.get("model")
            devinfo = None
            if model in ["bslamp1", "color"]:
                devinfo = Bslamp1(dev)
            elif model == "ctrl_neutral1":
                devinfo = Ctrl1(dev)
            elif model == "ctrl_neutral2":
                devinfo = Ctrl2(dev, self.channel)
            elif model == "plug":
                devinfo = Plug(dev)
            return devinfo.query(devdata)
        elif self.sid in self.scenedb:
            return {"online": True}


class ExecuteDevice:
    def __init__(self, devdata, cmd):
        srv = Server()
        self.devdb = srv.db("devices")
        self.scenedb = srv.db("scenes")
        self.channel = None
        self.sid = devdata["id"]
        if self.sid[-2] == ".":
            self.sid, self.channel = self.sid.rsplit(".", 1)
        self.cmd = cmd

    def execute(self):
        _dev = None
        if self.sid in self.devdb:
            dev = self.devdb.get(self.sid)
            model = dev.get("model")
            if model in ["bslamp1", "color"]:
                _dev = Bslamp1(dev)
            elif model == "ctrl_neutral1":
                _dev = Ctrl1(dev)
            elif model == "ctrl_neutral2":
                _dev = Ctrl2(dev, self.channel)
            elif model == "plug":
                _dev = Plug(dev)

        elif self.sid in self.scenedb:
            dev = self.scenedb.get(self.sid)
            _dev = Scene(dev)
        else:
            return {}

        # try:
        return _dev.exectute(self.cmd)
        # except Exception:
        # return {}


class GoogleDevice:
    def __init__(self, data):
        self.id = data.get("_id")
        self.type = ""
        self.traits = list()
        self.name = {"defaultNames": [], "name": data.get("name"), "nicknames": []}
        self.willReportState = False
        self.roomHint = data.get("place")
        self.deviceInfo = {
            "manufacturer": data.get("family", ""),
            "model": data.get("model", ""),
            "hwVersion": "",
            "swVersion": "",
        }
        self.customData = {}
        self.attributes = {}

    def sync(self):
        return {
            "id": self.id,
            "type": self.type,
            "traits": self.traits,
            "name": self.name,
            "willReportState": self.willReportState,
            "roomHint": self.roomHint,
            "deviceInfo": self.deviceInfo,
            "customData": self.customData,
            "attributes": self.attributes,
        }

    def query(self, devdata):
        pass

    def exectute(self, data):
        return {}

    def _power(self, status):
        return {"on": True, "off": False, True: "on", False: "off"}.get(status)


class Bslamp1(GoogleDevice):
    def __init__(self, data):
        super().__init__(data)
        self.type = "action.devices.types.LIGHT"
        self.traits.append("action.devices.traits.OnOff")
        self.traits.append("action.devices.traits.Brightness")
        self.traits.append("action.devices.traits.ColorSetting")
        self.attributes = {
            "colorModel": "rgb",
            "colorTemperatureRange": {"temperatureMinK": 1700, "temperatureMaxK": 6500},
        }

    def query(self, devdata):
        ret = {
            "on": self._power(devdata["power"]),
            "online": True,
            "brightness": int(devdata["bright"]),
            "color": {},
        }
        if devdata["color_mode"] == "1":
            ret["color"]["spectrumRgb"] = int(devdata["rgb"])
        elif devdata["color_mode"] == "2":
            ret["color"]["temperatureK"] = int(devdata["ct"])
        return ret

    def exectute(self, execution):
        arg = {
            "action.devices.commands.OnOff": "set_power",
            "action.devices.commands.BrightnessAbsolute": "set_bright",
            "action.devices.commands.ColorAbsolute": "set_color",
        }.get(execution["command"], "unknown")

        param = "unknown"
        if arg == "set_power":
            param = self._power(execution["params"]["on"])
        elif arg == "set_bright":
            param = execution["params"]["brightness"]
        elif arg == "set_color":
            if "temperature" in execution["params"]["color"]:
                arg = "set_ct_abx"
                param = execution["params"]["color"]["temperature"]
            elif "spectrumRGB" in execution["params"]["color"]:
                param = execution["params"]["color"]["spectrumRGB"]
            else:
                param = execution["params"]
        return {"sid": self.id, "cmd": "write", "data": {arg: param}}


class Color(Bslamp1):
    pass


class Ctrl1(GoogleDevice):
    def __init__(self, data):
        super().__init__(data)
        self.type = "action.devices.types.LIGHT"
        self.traits.append("action.devices.traits.OnOff")

    def query(self, devdata):
        ret = {
            "on": self._power(devdata["channel_0"]),
            "online": True,
        }
        return ret

    def exectute(self, execution):
        arg = {"action.devices.commands.OnOff": "channel_0"}.get(
            execution["command"], "unknown"
        )
        param = {
            "channel_0": self._power(execution["params"]["on"]),
        }.get(arg, "unknown")
        return {"sid": self.id, "cmd": "write", "data": {arg: param}}


class Ctrl2(Ctrl1):
    def __init__(self, data, channel):
        super().__init__(data)
        self.channel = channel

    def query(self, devdata):
        ret = {
            "on": self._power(devdata[f"channel_{self.channel}"]),
            "online": True,
        }
        return ret

    def exectute(self, execution):
        arg = {"action.devices.commands.OnOff": "channel_"}.get(
            execution["command"], "unknown"
        )
        param = {
            "channel_": self._power(execution["params"]["on"]),
        }.get(arg, "unknown")
        arg += self.channel
        return {"sid": self.id, "cmd": "write", "data": {arg: param}}


class Plug(GoogleDevice):
    def __init__(self, data):
        super().__init__(data)
        self.type = "action.devices.types.OUTLET"
        self.traits.append("action.devices.traits.OnOff")

    def query(self, devdata):
        ret = {
            "on": self._power(devdata["status"]),
            "online": True,
        }
        return ret

    def exectute(self, execution):
        arg = {"action.devices.commands.OnOff": "status"}.get(
            execution["command"], "unknown"
        )
        param = {
            "status": self._power(execution["params"]["on"]),
        }.get(arg, "unknown")
        return {"sid": self.id, "cmd": "write", "data": {arg: param}}


class Scene(GoogleDevice):
    def __init__(self, data):
        super().__init__(data)
        self.type = "action.devices.types.SCENE"
        self.traits.append("action.devices.traits.Scene")
        self.attributes["sceneReversible"] = data.get("reversible", False)
        self.deviceInfo["manufacturer"] = "AngryHome"
        self.deviceInfo["model"] = "scene"

    @staticmethod
    def query():
        return {
            "online": True,
        }

    def exectute(self, execution):
        arg = {"action.devices.commands.ActivateScene": "status"}.get(
            execution["command"], "unknown"
        )
        if execution["params"]["deactivate"]:
            param = "off"
        else:
            param = "on"

        return {"sid": self.id, "cmd": "write", "data": {arg: param}}
