import sqlite3


def schema(dbpath="rtrader.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()

        cur.execute("""
        CREATE TABLE accounts (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            password_hash VARCHAR(128),
            api_key VARCHAR(15),
            balance FLOAT
        );""")

        cur.execute("""
        CREATE TABLE positions (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            accounts_pk INTEGER NOT NULL,
            ticker VARCHAR(5),
            shares INTEGER,
            FOREIGN KEY (accounts_pk) REFERENCES accounts(pk),
            CONSTRAINT account_ticker UNIQUE(accounts_pk, ticker)
        );""")

        cur.execute("""
        CREATE TABLE trades (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            accounts_pk VARCHAR(16) NOT NULL,
            ticker VARCHAR(5),
            volume INTEGER,
            price FLOAT,
            trade_type BOOL,
            timestamp FLOAT,
            FOREIGN KEY (accounts_pk) REFERENCES accounts(pk)
        );""")

if __name__ == "__main__":
    schema()
