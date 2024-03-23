import requests
import machine

baseUrl = 'https://www.laundryview.com/api'
location_list = {}

# returns a list of locations with their corresponding location id
def get_location_list() -> dict:
    global location_list
    if (len(location_list) != 0):
        return location_list
    response = requests.get(f"{baseUrl}/c_room?cui=1&loc=7&rdm=1708884506418")
    result = response.json()

    room_list = result["room_data"]
    result_list = {}
    for item in room_list:
        result_list[item["laundry_room_name"]] = int(item["laundry_room_location"])
    location_list = result_list
    return location_list 


# returns the location id based on the given string 
# returns -1 if not found
def get_location_id(location : str) -> int:
    global location_list
    for locInList in location_list:
        if(locInList.casefold() == location.casefold()):
            return location_list[locInList]
    return -1

# returns a list of Machine objects given the location id
def get_room_objects(id : int) -> list:
    response = requests.get(f"{baseUrl}/currentRoomData?school_desc_key=405&location={id}")
    result = response.json()

    object_list = result["objects"]
    result_list = []
    for object in object_list:
        if object["type"] != 'D' and object["type"] != 'cardReader':
            result_list.append(machine.Machine(object["appliance_desc"], 
                                               object["type"], 
                                               object["time_left_lite"], 
                                               object["x"], 
                                               object["y"],
                                               object["orientation"]))
            if object["type"] == 'dblDry':
                result_list.append(machine.Machine(object["appliance_desc2"], 
                                                   object["type"], 
                                                   object["time_left_lite2"], 
                                                   object["x"], 
                                                   object["y"],
                                                   object["orientation"]))
    return result_list
