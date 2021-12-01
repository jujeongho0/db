from bs4 import BeautifulSoup
import json
from selenium import webdriver
import time
import requests
import re

date = '2021-11-29'

def change_to_int(string):
    temp = ''
    for s in string:
        if s != ',': temp += s
    return int(temp)

file_path = "AREA.json"

area_data = {}
with open(file_path, "r", encoding='UTF-8-sig') as infile:
    area_data = json.load(infile)

driver = webdriver.Chrome('chromedriver.exe')
url = 'https://kosis.kr/covid/covid_index.do'
driver.get(url)
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

seoul_confirmed = change_to_int(soup.select_one('#I11').get_text())
gangwon_confirmed = change_to_int(soup.select_one('#I32').get_text())
gyeonggi_confirmed = change_to_int(soup.select_one('#I31').get_text())
incheon_confirmed = change_to_int(soup.select_one('#I23').get_text())
chungbuk_confirmed = change_to_int(soup.select_one('#I33').get_text())
daejeon_confirmed = change_to_int(soup.select_one('#I25').get_text())
chungnam_confirmed = change_to_int(soup.select_one('#I34').get_text())
jeonbuk_confirmed = change_to_int(soup.select_one('#I35').get_text())
gwangju_confirmed = change_to_int(soup.select_one('#I24').get_text())
jeonnam_confirmed = change_to_int(soup.select_one('#I36').get_text())
gyeongnam_confirmed = change_to_int(soup.select_one('#I38').get_text())
gyeongbuk_confirmed = change_to_int(soup.select_one('#I37').get_text())
ulsan_confirmed = change_to_int(soup.select_one('#I26').get_text())
busan_confirmed = change_to_int(soup.select_one('#I21').get_text())
daegu_confirmed = change_to_int(soup.select_one('#I22').get_text())
jeju_confirmed = change_to_int(soup.select_one('#I39').get_text())
sejong_confirmed = change_to_int(soup.select_one('#I29').get_text())
time.sleep(1)

recovered_button = driver.find_element_by_xpath('/html/body/div[2]/article[3]/div[1]/div/div[1]/p[2]/button[2]')
recovered_button.click()
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

seoul_recovered = change_to_int(soup.select_one('#I11').get_text())
gangwon_recovered = change_to_int(soup.select_one('#I32').get_text())
gyeonggi_recovered = change_to_int(soup.select_one('#I31').get_text())
incheon_recovered = change_to_int(soup.select_one('#I23').get_text())
chungbuk_recovered = change_to_int(soup.select_one('#I33').get_text())
daejeon_recovered = change_to_int(soup.select_one('#I25').get_text())
chungnam_recovered = change_to_int(soup.select_one('#I34').get_text())
jeonbuk_recovered = change_to_int(soup.select_one('#I35').get_text())
gwangju_recovered = change_to_int(soup.select_one('#I24').get_text())
jeonnam_recovered = change_to_int(soup.select_one('#I36').get_text())
gyeongnam_recovered = change_to_int(soup.select_one('#I38').get_text())
gyeongbuk_recovered = change_to_int(soup.select_one('#I37').get_text())
ulsan_recovered = change_to_int(soup.select_one('#I26').get_text())
busan_recovered = change_to_int(soup.select_one('#I21').get_text())
daegu_recovered = change_to_int(soup.select_one('#I22').get_text())
jeju_recovered = change_to_int(soup.select_one('#I39').get_text())
sejong_recovered = change_to_int(soup.select_one('#I29').get_text())
time.sleep(1)

isolated_button = driver.find_element_by_xpath('/html/body/div[2]/article[3]/div[1]/div/div[1]/p[2]/button[3]')
isolated_button.click()
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

seoul_isolated = change_to_int(soup.select_one('#I11').get_text())
gangwon_isolated = change_to_int(soup.select_one('#I32').get_text())
gyeonggi_isolated = change_to_int(soup.select_one('#I31').get_text())
incheon_isolated = change_to_int(soup.select_one('#I23').get_text())
chungbuk_isolated = change_to_int(soup.select_one('#I33').get_text())
daejeon_isolated = change_to_int(soup.select_one('#I25').get_text())
chungnam_isolated = change_to_int(soup.select_one('#I34').get_text())
jeonbuk_isolated = change_to_int(soup.select_one('#I35').get_text())
gwangju_isolated = change_to_int(soup.select_one('#I24').get_text())
jeonnam_isolated = change_to_int(soup.select_one('#I36').get_text())
gyeongnam_isolated = change_to_int(soup.select_one('#I38').get_text())
gyeongbuk_isolated = change_to_int(soup.select_one('#I37').get_text())
ulsan_isolated = change_to_int(soup.select_one('#I26').get_text())
busan_isolated = change_to_int(soup.select_one('#I21').get_text())
daegu_isolated = change_to_int(soup.select_one('#I22').get_text())
jeju_isolated = change_to_int(soup.select_one('#I39').get_text())
sejong_isolated = change_to_int(soup.select_one('#I29').get_text())
time.sleep(1)

deseased_button = driver.find_element_by_xpath('/html/body/div[2]/article[3]/div[1]/div/div[1]/p[2]/button[4]')
deseased_button.click()
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

seoul_deseased = change_to_int(soup.select_one('#I11').get_text())
gangwon_deseased = change_to_int(soup.select_one('#I32').get_text())
gyeonggi_deseased = change_to_int(soup.select_one('#I31').get_text())
incheon_deseased = change_to_int(soup.select_one('#I23').get_text())
chungbuk_deseased = change_to_int(soup.select_one('#I33').get_text())
daejeon_deseased = change_to_int(soup.select_one('#I25').get_text())
chungnam_deseased = change_to_int(soup.select_one('#I34').get_text())
jeonbuk_deseased = change_to_int(soup.select_one('#I35').get_text())
gwangju_deseased = change_to_int(soup.select_one('#I24').get_text())
jeonnam_deseased = change_to_int(soup.select_one('#I36').get_text())
gyeongnam_deseased = change_to_int(soup.select_one('#I38').get_text())
gyeongbuk_deseased = change_to_int(soup.select_one('#I37').get_text())
ulsan_deseased = change_to_int(soup.select_one('#I26').get_text())
busan_deseased = change_to_int(soup.select_one('#I21').get_text())
daegu_deseased = change_to_int(soup.select_one('#I22').get_text())
jeju_deseased = change_to_int(soup.select_one('#I39').get_text())
sejong_deseased = change_to_int(soup.select_one('#I29').get_text())
time.sleep(1)
driver.close()

all_area_no = {'서울': 1, '부산': 2, '대구': 3, '인천': 4, '광주': 5, '대전': 6, '울산': 7, '세종': 8, '경기': 9, '강원': 10, '충북': 11, '충남': 12, '전북': 13, '전남': 14, '경북': 15, '경남': 16, '제주': 17}


def getTodayCovidLevel():
    response = requests.get('http://ncov.mohw.go.kr/regSocdisBoardView.do')
    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')

        script_soup = soup.find_all(f'script')
        rss_data_script = script_soup[len(script_soup) - 1].contents[0]
        regex = re.compile(r'\[[\s\S]*?\]')

        # 스크립트 태그에서 RSS_DATA 변수 값을 가져오고 value 값 가져오기
        rss_data_original = regex.search(rss_data_script)\
            .group()\
            .replace("\t", "")\
            .split("\n")

        rss_data_arr = list(
            filter(lambda x: x.find('value') >= 0, rss_data_original))

        level_data = dict()

        for area, rss_data in zip(all_area_no, rss_data_arr):
            _, value = rss_data.split(',')[0:2]
            level = int(re.sub("[^0-9]", "", value))
            level_data[area] = level

        return level_data
    return None

d = getTodayCovidLevel()

area_data['AREA'][date] = [
    {
        "NAME" : "서울",
        "CONFIRMED" : seoul_confirmed,
        "ISOLATED" : seoul_isolated,
        "DESEASED" : seoul_deseased,
        "RECOVERED" : seoul_recovered,
        "DIST_LEVEL" : d['서울']
    },
    {
        "NAME" : "강원",
        "CONFIRMED" : gangwon_confirmed,
        "ISOLATED" : gangwon_isolated,
        "DESEASED" : gangwon_deseased,
        "RECOVERED" : gangwon_recovered,
        "DIST_LEVEL" : d['강원']
    },
    {
        "NAME" : "경기",
        "CONFIRMED" : gyeonggi_confirmed,
        "ISOLATED" : gyeonggi_isolated,
        "DESEASED" : gyeonggi_deseased,
        "RECOVERED" : gyeonggi_recovered,
        "DIST_LEVEL" : d['경기']
    },
    {
        "NAME" : "인천",
        "CONFIRMED" : incheon_confirmed,
        "ISOLATED" : incheon_isolated,
        "DESEASED" : incheon_deseased,
        "RECOVERED" : incheon_recovered,
        "DIST_LEVEL" : d['인천']
    },
    {
        "NAME" : "충북",
        "CONFIRMED" : chungbuk_confirmed,
        "ISOLATED" : chungbuk_isolated,
        "DESEASED" : chungbuk_deseased,
        "RECOVERED" : chungbuk_recovered,
        "DIST_LEVEL" : d['충북']
    },
    {
        "NAME" : "대전",
        "CONFIRMED" : daejeon_confirmed,
        "ISOLATED" : daejeon_isolated,
        "DESEASED" : daejeon_deseased,
        "RECOVERED" : daejeon_recovered,
        "DIST_LEVEL" : d['대전']
    },
    {
        "NAME" : "충남",
        "CONFIRMED" : chungnam_confirmed,
        "ISOLATED" : chungnam_isolated,
        "DESEASED" : chungnam_deseased,
        "RECOVERED" : chungnam_recovered,
        "DIST_LEVEL" : d['충남']
    },
    {
        "NAME" : "전북",
        "CONFIRMED" : jeonbuk_confirmed,
        "ISOLATED" : jeonbuk_isolated,
        "DESEASED" : jeonbuk_deseased,
        "RECOVERED" : jeonbuk_recovered,
        "DIST_LEVEL" : d['전북']
    },
    {
        "NAME" : "광주",
        "CONFIRMED" : gwangju_confirmed,
        "ISOLATED" : gwangju_isolated,
        "DESEASED" : gwangju_deseased,
        "RECOVERED" : gwangju_recovered,
        "DIST_LEVEL" : d['광주']
    },
    {
        "NAME" : "전남",
        "CONFIRMED" : jeonnam_confirmed,
        "ISOLATED" : jeonnam_isolated,
        "DESEASED" : jeonnam_deseased,
        "RECOVERED" : jeonnam_recovered,
        "DIST_LEVEL" : d['전남']
    },
    {
        "NAME" : "경남",
        "CONFIRMED" : gyeongnam_confirmed,
        "ISOLATED" : gyeongnam_isolated,
        "DESEASED" : gyeongnam_deseased,
        "RECOVERED" : gyeongnam_recovered,
        "DIST_LEVEL" : d['경남']
    },
    {
        "NAME" : "경북",
        "CONFIRMED" : gyeongbuk_confirmed,
        "ISOLATED" : gyeongbuk_isolated,
        "DESEASED" : gyeongbuk_deseased,
        "RECOVERED" : gyeongbuk_recovered,
        "DIST_LEVEL" : d['경북']
    },
    {
        "NAME" : "울산",
        "CONFIRMED" : ulsan_confirmed,
        "ISOLATED" : ulsan_isolated,
        "DESEASED" : ulsan_deseased,
        "RECOVERED" : ulsan_recovered,
        "DIST_LEVEL" : d['울산']
    },
    {
        "NAME" : "부산",
        "CONFIRMED" : busan_confirmed,
        "ISOLATED" : busan_isolated,
        "DESEASED" : busan_deseased,
        "RECOVERED" : busan_recovered,
        "DIST_LEVEL" : d['부산']
    },
    {
        "NAME" : "대구",
        "CONFIRMED" : daegu_confirmed,
        "ISOLATED" : daegu_isolated,
        "DESEASED" : daegu_deseased,
        "RECOVERED" : daegu_recovered,
        "DIST_LEVEL" : d['대구']
    },
    {
        "NAME" : "제주",
        "CONFIRMED" : jeju_confirmed,
        "ISOLATED" : jeju_isolated,
        "DESEASED" : jeju_deseased,
        "RECOVERED" : jeju_recovered,
        "DIST_LEVEL" : d['제주']
    },
    {
        "NAME" : "세종",
        "CONFIRMED" : sejong_confirmed,
        "ISOLATED" : sejong_isolated,
        "DESEASED" : sejong_deseased,
        "RECOVERED" : sejong_recovered,
        "DIST_LEVEL" : d['세종']
    }]

with open(file_path, 'w', encoding='UTF-8-sig') as outfile:
    json.dump(area_data, outfile, indent=4, ensure_ascii=False)