from bs4 import BeautifulSoup
import json
from selenium import webdriver
import time

def change_to_int(string):
    temp = ''
    for s in string:
        if s != ',': temp += s
    return int(temp)

file_path = "VACCINE.json"

vaccine_data = {}
with open(file_path, "r", encoding='UTF-8-sig') as infile:
    vaccine_data = json.load(infile)

driver = webdriver.Chrome('chromedriver.exe')
url = 'https://ncv.kdca.go.kr/vaccineStatus.es?mid=a11710000000'
driver.get(url)
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

count = 277
while 1:
    date = str(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > th').get_text())
    print(date)
    astrazeneca_vacc_once = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(5)').get_text())
    astrazeneca_vacc_fully = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(6)').get_text())
    pfizer_vacc_once = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(7)').get_text())
    pfizer_vacc_fully = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(8)').get_text())
    janssen_vacc_once = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(9)').get_text())
    moderna_vacc_once = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(10)').get_text())
    moderna_vacc_fully = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(11)').get_text())
    pfizer_booster_shot = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child(' + str(count) + ') > td:nth-child(12)').get_text())
    moderna_booster_shot = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child('+ str(count) + ') > td:nth-child(13)').get_text())
    janssen_booster_shot = change_to_int(soup.select_one('#content > div.data_table.tbl_scrl_mini.type3 > table > tbody > tr:nth-child('+ str(count) + ') > td:nth-child(14)').get_text())
    if date not in vaccine_data['VACCINE'].keys():
        vaccine_data['VACCINE'][date] = [
            {
                "NAME" : "아스트라제네카",
                "VACC_ONCE" : astrazeneca_vacc_once,
                "VACC_FULLY" : astrazeneca_vacc_fully,
                "VACC_BOOST" : None
            },
            {
                "NAME" : "화이자",
                "VACC_ONCE" : pfizer_vacc_once,
                "VACC_FULLY" : pfizer_vacc_fully,
                "VACC_BOOST" : pfizer_booster_shot
            },
            {
                "NAME" : "얀센",
                "VACC_ONCE" : janssen_vacc_once,
                "VACC_FULLY" : None,
                "VACC_BOOST" : janssen_booster_shot
            },
            {
                "NAME" : "모더나",
                "VACC_ONCE" : moderna_vacc_once,
                "VACC_FULLY" : moderna_vacc_fully,
                "VACC_BOOST" : moderna_booster_shot
            }]
    else:
        vaccine_data['VACCINE'][date][0]['VACC_ONCE'] = astrazeneca_vacc_once
        vaccine_data['VACCINE'][date][0]['VACC_FULLY'] = astrazeneca_vacc_fully
        vaccine_data['VACCINE'][date][0]['VACC_BOOST'] = None
        vaccine_data['VACCINE'][date][1]['VACC_ONCE'] = pfizer_vacc_once
        vaccine_data['VACCINE'][date][1]['VACC_FULLY'] = pfizer_vacc_fully
        vaccine_data['VACCINE'][date][1]['VACC_BOOST'] = pfizer_booster_shot
        vaccine_data['VACCINE'][date][2]['VACC_ONCE'] = janssen_vacc_once
        vaccine_data['VACCINE'][date][2]['VACC_FULLY'] = None
        vaccine_data['VACCINE'][date][2]['VACC_BOOST'] = janssen_booster_shot
        vaccine_data['VACCINE'][date][3]['VACC_ONCE'] = moderna_vacc_once
        vaccine_data['VACCINE'][date][3]['VACC_FULLY'] = moderna_vacc_fully
        vaccine_data['VACCINE'][date][3]['VACC_BOOST'] = moderna_booster_shot
    if date == '2021-11-29': break
    count -= 1

with open(file_path, 'w', encoding='UTF-8-sig') as outfile:
    json.dump(vaccine_data, outfile, indent=4, ensure_ascii=False)