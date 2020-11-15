import sqlite3
from .orm import ORM


class Position(ORM):

    def __init__(self, accounts_pk, ticker, shares, pk=None):
        self.pk = pk
        self.accounts_pk = accounts_pk
        self.ticker = ticker
        self.shares = shares

    def save(self):
        if self.pk:
            self._update(self.pk)
        else:
            self._insert()

    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO positions (accounts_pk, ticker, shares)
                    VALUES (?,?,?);
                  """
            values = (self.accounts_pk, self.ticker, self.shares)
            cursor.execute(sql, values)

    def _update(self,pk):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE positions
                     SET accounts_pk = ?, ticker = ?, shares=?
                    WHERE pk=?;
                """

            values= (self.accounts_pk,self.ticker,self.shares,self.pk)
            cursor.execute(sql, values)
            

    @classmethod
    def positions_for_user(cls, accounts_pk):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM positions WHERE accounts_pk=? AND shares>=1"""
            cursor.execute(sql, (accounts_pk,))
            positions = cursor.fetchall()
            return positions

    @classmethod
    def position_for_ticker(cls, accounts_pk, ticker):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
        sql = """SELECT * FROM positions
        WHERE accounts_pk=? AND ticker=?;
        """
        values = (accounts_pk, ticker)
        cursor.execute(sql, values)
        position = cursor.fetchone()
        if position:
            return Position(position[1], position[2], position[3], position[0])
        return None



