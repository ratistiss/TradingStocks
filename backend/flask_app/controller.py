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
    data = request.get_json()
    account = Account.login(data.get("username"), data.get("password"))
    if account:
        account.api_key = account.random_api_key()
        account.save()
        return jsonify({"session_id": account.api_key, 
                    "username": account.username,
                    "balance": account.balance})
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
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"error":"hey look at me Im an error"})
    try:
        account.buy(data.get("ticker"), data.get("volume"))
    except InsufficientFundsError:
        return jsonify({"error": "insufficient funds"})
    return jsonify({"success":True})

@app.route("/api/sell", methods=["POST"])
def sell():
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"error":"hey look at me Im an error"})
    try:
        account.sell(data.get("ticker"), data.get("volume"))
    except:
        return jsonify({"error": "insufficient shares"})
    return jsonify({"success":True})

@app.route("/api/portfolio", methods=["POST"])
def portfolio():
    data = request.get_json()
    token = data.get("token")
    account = Account.api_authenticate(token)
    positions = []
    if account:
        positions = account.portfolio()
    return jsonify({"username": account.username, "balance": account.balance, "positions": positions})

@app.route("/api/transactions", methods=["POST"])
def transactions():
    data = request.get_json()
    token = data.get("token")
    account = Account.api_authenticate(token)
    trades = []
    if account:
        trades = account.my_trades()
    return jsonify({"trades": trades})

@app.route("/api/logout/<token>", methods=["GET"])
def logout():
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    account.api_token = None
    account.save()
    return jsonify({})

