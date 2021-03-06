import json
import random

with open('FF_area.json', "r", encoding='UTF-8-sig') as json_file:
    area_data = json.load(json_file)

with open('VACCINE.json', "r", encoding='UTF-8-sig') as json_file:
    vaccine_data = json.load(json_file)

with open('F_DAILY.json', "r", encoding='UTF-8-sig') as json_file:
    daily_data = json.load(json_file)

dates = ['2021-12-16','2021-12-17']

for date in dates:
    confirmed = 0
    isolated = 0
    deseased = 0
    recovered = 0
    for a in area_data['AREA']:
        if a['DATE'] == date:
            confirmed += a['CONFIRMED']
            isolated += a['ISOLATED']
            deseased += a['DESEASED']
            recovered += a['RECOVERED']

    vacc_once = 0
    vacc_fully = 0
    vacc_boost = 0
    for v in vaccine_data['VACCINE']:
        if v['DATE'] == date:
            vacc_once += v['VACC_ONCE']

            if isinstance(v['VACC_FULLY'], int): vacc_fully += v['VACC_FULLY']
            if isinstance(v['VACC_BOOST'], int): vacc_boost += v['VACC_BOOST']

    daily_data['DAILY'].append({
            "DATE": date,
            "CONFIRMED": confirmed,
            "ISOLATED": isolated,
            "DESEASED": deseased,
            "RECOVERED": recovered,
            "VACC_ONCE": vacc_once,
            "VACC_FULLY": vacc_fully,
            "VACC_BOOST": vacc_boost
        })

with open('FF_daily.json', 'w', encoding='UTF-8-sig') as outfile:
    json.dump(daily_data, outfile, indent=4, ensure_ascii=False)


