import pandas as pd # pip install pandas
import requests # pip install requests
import json # pip install json

def get_geocod(location):
    API_KEY="P2Fnw8tOMaBEakEX2WbSgHXGfag02Erf"

    # read dataframa / csv in ex
    #df = pd.read_csv("filename.csv")
    # direccion: Calle N°, Comuna, Pais, Cod postal
    # API call - get lat & long values
    # mini test
    parameters = {
        "key":API_KEY,
        "location":location
    }

    response = requests.get("https://www.mapquestapi.com/geocoding/v1/address",params=parameters)
    data=json.loads(response.text)["results"]
    lat=data[0]["locations"][0]["latLng"]["lat"]
    lng=data[0]["locations"][0]["latLng"]["lng"]
    return lat,lng