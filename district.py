from bs4 import BeautifulSoup
import json
from selenium import webdriver
import time

date = '2021-11-29'

def change_to_int(string):
    temp = ''
    for s in string:
        if s != ',' and s != '+': temp += s
    return int(temp)

file_path = "DISTRICT.json"

district_data = {}
with open(file_path, "r", encoding='UTF-8-sig') as infile:
    district_data = json.load(infile)

driver = webdriver.Chrome('chromedriver.exe')
url = 'https://www.seoul.go.kr/coronaV/coronaStatus.do'
driver.get(url)
time.sleep(1)
confirmed_button = driver.find_element_by_xpath('/html/body/div[2]/div[2]/div[2]/div/div[4]/ul/li[1]/button')
confirmed_button.click()
time.sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

gangnam_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(1)').get_text())
gangdong_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(2)').get_text())
gangbuk_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(3)').get_text())
gangseo_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(4)').get_text())
gwanak_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(5)').get_text())
gwangjin_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(3) > td:nth-child(6)').get_text())
guro_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(1)').get_text())
geumcheon_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(2)').get_text())
nowon_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(3)').get_text())
dobong_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(4)').get_text())
dongdaemun_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(5)').get_text())
dongjak_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(6) > td:nth-child(6)').get_text())
mapo_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(1)').get_text())
seodaemun_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(2)').get_text())
seocho_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(3)').get_text())
sungdong_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(4)').get_text())
sungbuk_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(5)').get_text())
songpa_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(9) > td:nth-child(6)').get_text())
yangcheon_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(1)').get_text())
yeongdeungpo_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(2)').get_text())
yongsan_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(3)').get_text())
eunpyeong_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(4)').get_text())
jongro_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(5)').get_text())
jung_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(12) > td:nth-child(6)').get_text())
jungrang_confirmed = change_to_int(soup.select_one('#move-cont1 > div:nth-child(4) > table.tstyle-status.mobile.mobile-table > tbody > tr:nth-child(15) > td:nth-child(1)').get_text())
time.sleep(1)
driver.close()

district_data['DISTRICT'][date] = [
    {
        "AREA" : "서울",
        "DISTRICT" : "강남구",
        "CONFIRMED" : gangnam_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "강동구",
        "CONFIRMED" : gangdong_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "강북구",
        "CONFIRMED" : gangbuk_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "강서구",
        "CONFIRMED" : gangseo_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "관악구",
        "CONFIRMED" : gwanak_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "광진구",
        "CONFIRMED" : gwangjin_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "구로구",
        "CONFIRMED" : guro_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "금천구",
        "CONFIRMED" : geumcheon_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "노원구",
        "CONFIRMED" : nowon_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "도봉구",
        "CONFIRMED" : dobong_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "동대문구",
        "CONFIRMED" : dongdaemun_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "동작구",
        "CONFIRMED" : dongjak_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "마포구",
        "CONFIRMED" : mapo_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "서대문구",
        "CONFIRMED" : seodaemun_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "서초구",
        "CONFIRMED" : seocho_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "성동구",
        "CONFIRMED" : sungdong_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "성북구",
        "CONFIRMED" : sungbuk_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "송파구",
        "CONFIRMED" : songpa_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "양천구",
        "CONFIRMED" : yangcheon_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "영등포구",
        "CONFIRMED" : yeongdeungpo_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "용산구",
        "CONFIRMED" : yongsan_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "은평구",
        "CONFIRMED" : eunpyeong_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "종로구",
        "CONFIRMED" : jongro_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "중구",
        "CONFIRMED" : jung_confirmed
    },
    {
        "AREA" : "서울",
        "DISTRICT" : "중랑구",
        "CONFIRMED" : jungrang_confirmed
    }]

with open(file_path, 'w', encoding='UTF-8-sig') as outfile:
    json.dump(district_data, outfile, indent=4, ensure_ascii=False)