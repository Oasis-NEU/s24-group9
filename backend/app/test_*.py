import model
import machine

def test_get_location_list():
    assert len(model.location_list) == 51
    assert model.location_list["10 COVENTRY ST"] == 1343645

def test_get_location_id():
    assert model.get_location_id('stetson west back') == 1343631
    assert model.get_location_id('10 coventry st') == 1343645
    assert model.get_location_id('bob') == -1

def test_get_room_objects():
    stwest_room = model.get_room_objects(1343631)
    assert len(stwest_room) == 14
    assert stwest_room[0].desc == 'B 9'
    assert stwest_room[0].type == 'washFL'