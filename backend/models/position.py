import sqlite3
from .orm import ORM


class Position(ORM):

    def __init__(self, accounts_pk, ticker, shares, pk=None):
        self.pk = pk
        self.accounts_pk = accounts_pk
        self.ticker = ticker
        self.shares = shares

    def save(self):
        """Call _insert if the row does not exist in the database, otherwise
        call _update
        """
        if self.pk:
            self._update()
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
    def positions_for_user(cls, account_pk):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM positions WHERE api_key=?"""
            cursor.execute(sql, (account_pk,))
            positions = cursor.fetchall()
            return positions

    @classmethod
    def position_for_ticker(cls, account_pk, ticker):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
        sql = """SELECT * FROM positions
        WHERE account_pk=?, ticker=?;
        """
        values = (account_pk, ticker)
        cursor.execute(sql, values)
        position = cursor.fetchone()
        if position:
            return Position(position[1], position[2], position[3], position[0])
        return None



