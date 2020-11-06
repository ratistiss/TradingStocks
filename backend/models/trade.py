import sqlite3
import time
from .orm import ORM

class Trade(ORM):

    def __init__(self, accounts_pk, ticker, volume, price, trade_type, pk=None):
        self.accounts_pk = accounts_pk
        self.ticker = ticker
        self.volume = volume
        self.price = price
        self.trade_type = trade_type
        self.timestamp = time.time()
        self.pk = pk

    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO trades (accounts_pk, ticker, volume, price, trade_type, timestamp)
                VALUES (?,?,?,?,?,?);
              """
            values = (self.accounts_pk, self.ticker, self.volume, self.price, self.trade_type, self.timestamp)
            cursor.execute(sql, values)

    @classmethod
    def all_for_user(cls, accounts_pk):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM accounts WHERE accounts_pk=?"""
            cursor.execute(sql, (accounts_pk,))
            return cursor.fetchall()


