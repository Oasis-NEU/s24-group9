# represents a machine
class Machine:
    def __init__(self, desc, type, x, y, orient):
        # Numbering of machine (ex: A1)
        self.desc = desc
        # Type of machine (washer / card reader)
        self.type = type
        # x coord
        self.x = x
        # y coord
        self.y = y
        # orientation (ex: SW) 
        self.orient = orient

