class WebHook:
    def __init__(self, data):
        self.request = WebHookRequest(data)

    def response(self, data):
        return ""


class WebHookRequest:
    """{'responseId': '70fcb8f3-b737-4978-91e1-ff0256b13814-b4ef8d5f',
    'queryResult': {'queryText': 'What is closed', 'parameters': {}, 'allRequiredParamsPresent': True, 'outputContexts': [{'name': 'projects/hometemp-a3fa6/agent/sessions/a1d03b39-0296-07c1-a8f2-90e506c304f9/contexts/__system_counters__', 'parameters': {'no-input': 0.0, 'no-match': 0.0}}], 'intent': {'name': 'projects/hometemp-a3fa6/agent/intents/34af1214-1cd1-434f-a432-243c4f813f19', 'displayName': 'Door and window'}, 'intentDetectionConfidence': 1.0, 'languageCode': 'en'}, 'originalDetectIntentRequest': {'payload': {}}, 'session': 'projects/hometemp-a3fa6/agent/sessions/a1d03b39-0296-07c1-a8f2-90e506c304f9'}"""

    def __init__(self, data):
        self.responseId = ""
        self.queryText = ""
        self.parameters = {}
        self.allRequiredParamsPresent = True
        self.outputContexts = []


class WebHookResponse:
    pass


class BaseIntent:
    pass


class IntentDoorAndWindow(BaseIntent):
    pass


class IntetntTemperature(BaseIntent):
    pass
