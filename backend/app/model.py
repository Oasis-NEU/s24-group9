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
    desc = []
    dictionary_results = {}
    #for loop that adds the results to the dictionary and the app desc list 
    for object in object_list:
        if object["type"] != 'D' and object["type"] != 'cardReader':
            if 'appliance_desc' in object:
                #adds the object to the dictionary under the app_desc
                machineType = str(object["type"])
                machineType2 = str(object["type"])
                if machineType.__contains__('N'):
                    machineType = machineType[0:4]
                    machineType2 = machineType2[5:]
                    if str(object["appliance_type"]).__contains__('D'):
                        machineType = 'dry'
                        machineType2 = 'wash'
                dictionary_results[object["appliance_desc"]] = machine.Machine(object["appliance_desc"], 
                                               machineType, 
                                               object["time_left_lite"], 
                                               object["x"], 
                                               object["y"],
                                               object["orientation"])
                #adds the object to a list of app_desc (facilitates the sorting)
                desc.append(object["appliance_desc"])
                if object["type"] == 'dblDry' or object["type"] == 'washNdry' or object["type"] == 'dblWash' and 'appliance_desc2' in object:
                    dictionary_results[object["appliance_desc2"]] = machine.Machine(object["appliance_desc2"], 
                                               machineType2, 
                                               object["time_left_lite2"], 
                                               object["x"], 
                                               object["y"],
                                               object["orientation"])
                    desc.append(object["appliance_desc2"])
    
    #sorts the items in the desc
    sorted_items = sorted(desc, key=lambda x: (''.join(filter(str.isalpha, x)), int(''.join(filter(str.isdigit, x)))))

    #returns a list of all the sorted items 
    return [dictionary_results[i] for i in sorted_items]