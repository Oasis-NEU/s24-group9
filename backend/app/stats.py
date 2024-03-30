from model import *
from collections import defaultdict

# calculates the average usage of a list of machines over a given time period.
def calculate_average_usage(machine_list, time_period):
    usage_stats = defaultdict(int)

    # increment the usage count for the corresponding time in the usage_stats dict.
    for machine in machine_list:
        for minute in range(time_period):
            usage_stats[(machine.time - minute) % (24*60)] += 1

    avg_usage = [0] * (24*60)

    # for loop that divides the usage count by the number of machines
    for time, usage in usage_stats.items():
        avg_usage[time] = usage / len(machine_list)

    return avg_usage



# generates a dictionary of room stats and building stats
def generate_stats():
    global location_list
    location_list = get_location_list()
    machine_list = []

    # for loop that appends a list of machine objects for each location in the location_list
    for location in location_list:
        machine_list.append(get_room_objects(location_list[location]))

    avg_usage = calculate_average_usage(machine_list, 7*24*60) # one week
    room_stats = defaultdict(lambda: {'name': '', 'total_time': 0, 'avg_usage': []})

    # for loop that appends the average usage for each room to the room_stats dictionary
    for machine in machine_list:
        room_stats[machine.appliance_desc]['total_time'] += machine.time_left_lite
        room_stats[machine.appliance_desc]['avg_usage'].append(avg_usage[machine.time % (24*60)])

    building_stats = {'name': 'Building', 'total_time': 0, 'avg_usage': []}

    # for loop that appends the average usage for each building to the building_stats dictionary
    for avg in avg_usage:
        building_stats['avg_usage'].append(avg)
 
    return room_stats, building_stats


