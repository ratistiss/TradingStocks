import requests

API_URL = "https://cloud.iexapis.com/stable"
QUOTE_ENDPOINT = "/stock/{}/quote?token="
BOND_ENDPOINT = "/something/else/{}/quote?token="

# TODO: read from external file
TOKEN = "pk_9619ca5e25cb4466880b7b1b6a68cfaa"

def get_price(ticker):
    """Quote a stock via IEX API using a ticker symbol (string)
    """
    try:
        response = requests.get(API_URL + QUOTE_ENDPOINT.format(ticker) + TOKEN)
    except requests.exceptions.ConnectionError:
        raise ConnectionError

    if response.status_code == 404:
        raise Exception("Ticker does not exist")

    return response.json().get("latestPrice")

# WEB SCRAPING
# def get_info(name):
#     soup = BeautifulSoup(response.text, "html.parser")
#     link = soup.find_all("a", attrs={"class":"image"})[0]
#     return