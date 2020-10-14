from flask_app.controller import app
from models.orm import ORM

ORM.dbpath = "data/rtrader.db"

if __name__ == "__main__":
    app.run(debug=True)