import sqlite3
from hashlib import sha256
import random
from .orm import ORM
from .trade import Trade
from .position import Position
from .util import get_price

class InsufficientFundsError(Exception):
    pass


class Account(ORM):

    def __init__(self, username, password_hash, api_key, balance, pk=None):
        self.pk = pk
        self.username = username
        self.password_hash = password_hash
        self.api_key = api_key
        self.balance = balance

    def _insert(self):
        password_hash = self.hash_password(self.password_hash)
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO accounts (username, password_hash, api_key, balance)
                VALUES (?,?,?,?);
              """
            values = (self.username, password_hash, self.api_key, self.balance)
            cursor.execute(sql, values)

    def _update(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE accounts SET api_key=?, balance=? WHERE pk=?"""
            cursor.execute(sql, (self.api_key, self.balance, self.pk))

    def buy(self, ticker, volume):
        price = get_price(ticker)

        if price * int(volume) > self.balance:
            raise InsufficientFundsError

        self.balance -= price * int(volume)
        position = Position.position_for_ticker(self.pk, ticker)
        if position:
            position.shares += int(volume)
        else:
            position = Position(self.pk, ticker, volume)
        trade = Trade(self.pk, ticker, volume, price, 1)

        trade.save()
        position.save()
        self.save()

    def sell(self, ticker, volume):
        position = Position.position_for_ticker(self.pk, ticker)
        price = get_price(ticker)

        if not position:
            raise Exception
        if position.shares < int(volume):
            raise Exception
            

        self.balance += price * int(volume)
        position.shares -= int(volume)
        trade = Trade(self.pk, ticker, volume, price, 0)

        trade.save()
        position.save()
        self.save()

    def my_trades(self):
        return Trade.all_for_user(self.pk)

    def portfolio(self):
        return Position.positions_for_user(self.pk)

    @classmethod
    def login(cls, username, password):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = '''SELECT * from accounts WHERE username=? AND password_hash=?'''
            cursor.execute(sql, (username, cls.hash_password(password)))
            user = cursor.fetchone()  
            return cls(user[1], user[2], user[3], user[4], user[0])     

    @classmethod
    def api_authenticate(cls, api_key):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM accounts WHERE api_key=?"""
            cursor.execute(sql, (api_key,))
            user = cursor.fetchone()
            if user:    
                return cls(user[1], user[2], user[3], user[4], user[0])
            return None

    @staticmethod
    def hash_password(password):
        hasher = sha256()
        hasher.update(password.encode())
        return hasher.hexdigest()

    @staticmethod
    def random_api_key(length=15):
        random_string = "".join([str(random.randint(1,10)) for i in range(25)])
        hasher = sha256()
        hasher.update(random_string.encode())
        return hasher.hexdigest()[:20]

