import json

# represents a machine
class Machine:
    def __init__(self, desc, type, status, x, y, orient):
        # Numbering of machine (ex: A1)
        self.desc = desc
        # Type of machine (washer / card reader)
        self.type = type
        # Current status of machine
        self.status = status
        # x coord
        self.x = x
        # y coord
        self.y = y
        # orientation (ex: SW) 
        self.orient = orient

    def to_dict(self):
        return {
            "desc": self.desc,
            "type": self.type,
            "status": self.status,
            "x": self.x,
            "y": self.y,
            "orient": self.orient
        }

