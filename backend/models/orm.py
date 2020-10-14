import sqlite3



class ORM:

    dbpath = ""

    def __init__(self):
        raise NotImplementedError

    def save(self):
        if self.pk:
            self._update()
        else:
            self._insert()