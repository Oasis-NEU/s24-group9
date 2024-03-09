import requests
import machine

baseUrl = 'https://www.laundryview.com/api'
location_list : dict

# returns a list of locations with their corresponding location id
def get_location_list() -> dict:
    response = requests.get(f"{baseUrl}/c_room?cui=1&loc=7&rdm=1708884506418")
    result = response.json()

    room_list = result["room_data"]
    location_list = {}
    for item in room_list:
        location_list[item["laundry_room_name"]] = int(item["laundry_room_location"])

    return location_list 

location_list = get_location_list()


# returns the location id based on the given string 
# returns -1 if not found
def get_location_id(location : str) -> int:
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
    return result_list
