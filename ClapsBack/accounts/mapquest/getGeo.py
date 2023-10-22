import pandas as pd # pip install pandas
import requests # pip install requests
import json # pip install json

API_KEY="P2Fnw8tOMaBEakEX2WbSgHXGfag02Erf"

# read dataframa / csv in ex
#df = pd.read_csv("filename.csv")
# direccion: Calle N°, Comuna, Pais, Cod postal

"""" usando lectura del df
for i, row in df.iterrows():
    apiAdress=str(df.at[i,"calle"])+","+str(df.at[i,"zip"])+","+str(df.at[i,"city"])+","+str(df.at[i,"country"])
    parameters = {
        "key":API_KEY,
        "location":apiAdress
    }

    response = requests.get("https://www.mapquestapi.com/geocoding/v1/address",params=parameters)
    data=json.loads(response.text)["results"]
    lat=data[0]["locations"][0]["latLng"]["lat"]
    lng=data[0]["locations"][0]["latLng"]["lng"]
    print(lat, lng)
    df.at[i,"lat"]=lat
    df.at[i,"lng"]=lng
"""
# API call - get lat & long values
# mini test
parameters = {
    "key":API_KEY,
    "location":'Jorge Washington 26, Nunoa, Chile, 7790864'
}

response = requests.get("https://www.mapquestapi.com/geocoding/v1/address",params=parameters)
data=json.loads(response.text)["results"]
lat=data[0]["locations"][0]["latLng"]["lat"]
lng=data[0]["locations"][0]["latLng"]["lng"]
print(lat, lng)

# Save data to csv / dataframe