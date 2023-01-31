#soo

import requests

def weather_func():
  url = "https://weatherapi-com.p.rapidapi.com/future.json"

  querystring = {"q":"London","dt":"2022-12-25"}

  headers = {
    "X-RapidAPI-Key": "01ada74b36msh31f643ffb99a3e8p15ba4bjsn72bd321b010b",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
  }

  response = requests.request("GET", url, headers=headers, params=querystring)

  print(response.text)
