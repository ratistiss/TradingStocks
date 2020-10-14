from flask import Flask, request, jsonify
from flask_cors import CORS
from models import Account, get_price, InsufficientFundsError

app = Flask(__name__)
CORS(app)

@app.route("/api/price/<ticker>", methods=["GET"])
def price(ticker):
    try:
        price = get_price(ticker)
    except ConnectionError:
        return jsonify({"error": "could not connect to IEX API"}), 500
    except Exception:
        return jsonify({"error": "ticker not found"}), 404
    return jsonify({"ticker": ticker, "price": price})

@app.route("/api/login", methods=["POST"])
def login():
    # get data from request
    data = request.get_json()
    # authenticate our account
    account = Account.login(data.get("username"), data.get("password"))
    # if the account exists, return api_token
    if account:
        account.api_key = account.random_api_key()
        account.save()
        return jsonify({"session_id": account.api_key, 
                    "username": account.username})
    return jsonify({"session_id": "", 
                    "username": ""})

@app.route("/api/create", methods=["POST"])
def create_user():
    data = request.get_json()
    key = Account.random_api_key()  
    new_account = Account(data.get("username"),data.get("password"), key, data.get("balance"))
    new_account.save()
    return jsonify({"session_id": new_account.api_key, 
                    "username": new_account.username})
    

@app.route("/api/buy", methods=["POST"])
def buy():
    # use token to authenticate user
    # get data from request
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    #not account
    if not account:
        return jsonify({"error":"hey look at me Im an error"})
    # if the account exists:
    try:
        account.buy(data.get("ticker"), data.get("volume"))
    except InsufficientFundsError:
        return jsonify({"error": "insufficient funds"})
    return jsonify({"success":True})

@app.route("/api/sell", methods=["POST"])
def sell():
    data = request.get_json()
    # use token to authenticate user
    account = Account.api_authenticate(data.get("token"))
    # get data from request
    # if the account exists:
    if not account:
        return jsonify({"error":"hey look at me Im an error"})
    # if the account exists:
    try:
        account.sell(data.get("ticker"), data.get("volume"))
    except InsufficientFundsError:
        return jsonify({"error": "insufficient funds"})
    return jsonify({"success":True})

# @app.route("/api/<api_token>/portfolio", methods=["GET"])
@app.route("/api/portfolio", methods=["POST"])
# def portfolio(api_token):
def portfolio():
    # use token to authenticate user
    data = request.get_json()
    token = data.get("token")
    account = Account.api_authenticate(token)
    # if the account exists:
    positions = []
    if account:
        positions = account.portfolio()
    return jsonify({"username": account.username, "positions": positions})

@app.route("/api/transactions", methods=["POST"])
def transactions():
    data = request.get_json()
    # use token to authenticate user
    account = Account.api_authenticate(data.get("token"))
    # get data from request
    account.save()
    # if the account exists:
    return jsonify({})

@app.route("/api/logout/<token>", methods=["GET"])
def logout():
    data = request.get_json()
    # use token to authenticate user
    account = Account.api_authenticate(data.get("token"))
    account.api_token = None
    account.save()
    return jsonify({})

