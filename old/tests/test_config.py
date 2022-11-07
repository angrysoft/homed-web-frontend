from homemanager import JConfig

config = JConfig()


def test_load_from_file(capsys):
    config.load_config_from_file("homedb.json")
    with capsys.disabled():
        print("test", config.get("rabbitmq"))
