from flask import Flask, jsonify
from flask_cors import CORS
import model

app = Flask(__name__)
CORS(app)

# returns location id of given string 
@app.route('/location/id/<name>', methods = ["GET"])
def get_location_id(name):
    return str(model.get_location_id(name))

# returns list of machine objects 
@app.route('/machines/<id>', methods = ["GET"])
def get_machines(id):
    machine_list = model.get_room_objects(int(id))
    machine_dicts = [machine.to_dict() for machine in machine_list]
    return machine_dicts

# returns machines in-use as a decimal 
@app.route('/machines/availability/<id>', methods = ["GET"])
def get_availability(id):
    machine_list = model.get_room_objects(int(id))
    total = 0
    in_use = 0

    for machine in machine_list:
        if machine.status != 'Offline':
            total = total + 1 
        if machine.status != 'Available' and machine.status != 'Offline':
            in_use = in_use + 1

    if total == 0:
        return str(-1) 
    
    result = round(in_use / total, 4)
    return str(result)

# returns the dictionary of all names : ids
@app.route('/rooms/names' , methods = ["GET"])
def get_room_names() :
    return model.location_list

if __name__ == '__main__':
    # Run the application on the local development server
    app.run(debug=True, port=3001)