import requests

all_area = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
            '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']

district_table = [
    [{"name": "성북구", "num": 7}, {"name": "은평구", "num": 11}, {"name": "송파구", "num": 23}, {"name": "노원구", "num": 10}, {"name": "관악구", "num": 20}, {"name": "강동구", "num": 24}, {"name": "양천구", "num": 14}, {"name": "도봉구", "num": 9}, {"name": "동작구", "num": 19}, {"name": "광진구", "num": 4}, {"name": "강남구", "num": 22}, {"name": "중랑구", "num": 6}, {"name": "서대문구",
                                                                                                                                                                                                                                                                                                                                                  "num": 12}, {"name": "마포구", "num": 13}, {"name": "구로구", "num": 16}, {"name": "용산구", "num": 2}, {"name": "성동구", "num": 3}, {"name": "종로구", "num": 0}, {"name": "중구", "num": 1}, {"name": "동대문구", "num": 5}, {"name": "강북구", "num": 8}, {"name": "강서구", "num": 15}, {"name": "금천구", "num": 17}, {"name": "영등포구", "num": 18}, {"name": "서초구", "num": 21}],
    [{"name": "중구", "num": 0}, {"name": "서구", "num": 1}, {"name": "동구", "num": 2}, {"name": "영도구", "num": 3}, {"name": "부산진구", "num": 4}, {"name": "동래구", "num": 5}, {"name": "남구", "num": 6}, {"name": "북구", "num": 7}, {
        "name": "강서구", "num": 8}, {"name": "해운대구", "num": 9}, {"name": "사하구", "num": 10}, {"name": "금정구", "num": 11}, {"name": "연제구", "num": 12}, {"name": "수영구", "num": 13}, {"name": "사상구", "num": 14}, {"name": "기장군", "num": 15}],
    [{"name": "남동구", "num": 4}, {"name": "서구", "num": 7}, {"name": "계양구", "num": 6}, {"name": "중구", "num": 0}, {"name": "동구", "num": 1}, {
        "name": "강화군", "num": 8}, {"name": "미추홀구", "num": 2}, {"name": "연수구", "num": 3}, {"name": "부평구", "num": 5}, {"name": "옹진군", "num": 9}],
    [{"name": "중구", "num": 0}, {"name": "동구", "num": 1}, {"name": "서구", "num": 2}, {"name": "남구", "num": 3}, {
        "name": "북구", "num": 4}, {"name": "수성구", "num": 5}, {"name": "달서구", "num": 6}, {"name": "달성군", "num": 7}],
    [{"name": "북구", "num": 3}, {"name": "서구", "num": 1}, {"name": "광산구",
                                                          "num": 4}, {"name": "동구", "num": 0}, {"name": "남구", "num": 2}],
    [{"name": "동구", "num": 0}, {"name": "중구", "num": 1}, {"name": "서구",
                                                          "num": 2}, {"name": "대덕구", "num": 4}, {"name": "유성구", "num": 3}],
    [{"name": "동구", "num": 2}, {"name": "북구", "num": 3}, {"name": "중구",
                                                          "num": 0}, {"name": "울주군", "num": 4}, {"name": "남구", "num": 1}],
    None,  # 7번 세종 패쓰
    [{"name": "고양시", "num": 1}, {"name": "성남시", "num": 11}, {"name": "용인시", "num": 22}, {"name": "수원시", "num": 12}, {"name": "안산시", "num": 14}, {"name": "안양시", "num": 16}, {"name": "평택시", "num": 27}, {"name": "시흥시", "num": 13}, {"name": "김포시", "num": 7}, {"name": "광명시", "num": 3}, {"name": "하남시", "num": 29}, {"name": "화성시", "num": 30}, {"name": "파주시", "num": 26}, {"name": "군포시", "num": 6}, {"name": "구리시", "num": 5}, {"name": "양평군",
                                                                                                                                                                                                                                                                                                                                                                                                                                     "num": 18}, {"name": "의왕시", "num": 23}, {"name": "광주시", "num": 4}, {"name": "안성시", "num": 15}, {"name": "오산시", "num": 21}, {"name": "가평군", "num": 0}, {"name": "연천군", "num": 20}, {"name": "과천시", "num": 2}, {"name": "남양주시", "num": 8}, {"name": "동두천시", "num": 9}, {"name": "부천시", "num": 10}, {"name": "양주시", "num": 17}, {"name": "여주시", "num": 19}, {"name": "의정부시", "num": 24}, {"name": "이천시", "num": 25}, {"name": "포천시", "num": 28}],
    [{"name": "춘천시", "num": 1}, {"name": "원주시", "num": 0}, {"name": "홍천군", "num": 6}, {"name": "동해시", "num": 3}, {"name": "양구군", "num": 17}, {"name": "고성군", "num": 14}, {"name": "화천군", "num": 16}, {"name": "삼척시", "num": 5}, {"name": "태백시", "num": 7}, {
        "name": "횡성군", "num": 9}, {"name": "정선군", "num": 12}, {"name": "강릉시", "num": 2}, {"name": "속초시", "num": 4}, {"name": "철원군", "num": 8}, {"name": "평창군", "num": 10}, {"name": "영월군", "num": 11}, {"name": "인제군", "num": 13}, {"name": "양양군", "num": 15}],
    [{"name": "청주시", "num": 0}, {"name": "충주시", "num": 1}, {"name": "옥천군", "num": 4}, {"name": "제천시", "num": 2}, {"name": "단양군", "num": 10}, {"name": "영동군",
                                                                                                                                              "num": 5}, {"name": "보은군", "num": 3}, {"name": "증평군", "num": 6}, {"name": "진천군", "num": 7}, {"name": "괴산군", "num": 8}, {"name": "음성군", "num": 9}],
    [{"name": "아산시", "num": 3}, {"name": "천안시", "num": 0}, {"name": "홍성군", "num": 12}, {"name": "당진시", "num": 7}, {"name": "서산시", "num": 4}, {"name": "논산시", "num": 5}, {"name": "예산군", "num": 13}, {"name": "보령시",
                                                                                                                                                                                                     "num": 2}, {"name": "태안군", "num": 14}, {"name": "공주시", "num": 1}, {"name": "계룡시", "num": 6}, {"name": "금산군", "num": 8}, {"name": "부여군", "num": 9}, {"name": "서천군", "num": 10}, {"name": "청양군", "num": 11}],
    [{"name": "경산시", "num": 9}, {"name": "포항시", "num": 0}, {"name": "울진군", "num": 21}, {"name": "경주시", "num": 1}, {"name": "구미시", "num": 4}, {"name": "청도군", "num": 15}, {"name": "영덕군", "num": 14}, {"name": "김천시", "num": 2}, {"name": "성주군", "num": 17}, {"name": "안동시", "num": 3}, {"name": "영천시", "num": 6}, {"name": "문경시",
                                                                                                                                                                                                                                                                                                                   "num": 8}, {"name": "영양군", "num": 13}, {"name": "영주시", "num": 5}, {"name": "상주시", "num": 7}, {"name": "군위군", "num": 10}, {"name": "의성군", "num": 11}, {"name": "청송군", "num": 12}, {"name": "고령군", "num": 16}, {"name": "칠곡군", "num": 18}, {"name": "예천군", "num": 19}, {"name": "봉화군", "num": 20}, {"name": "울릉군", "num": 22}],
    [{"name": "양산시", "num": 3}, {"name": "창원시", "num": 0}, {"name": "함안군", "num": 8}, {"name": "거제시", "num": 4}, {"name": "밀양시", "num": 7}, {"name": "창녕군", "num": 10}, {"name": "김해시", "num": 1}, {"name": "진주시", "num": 2}, {"name": "통영시", "num": 5}, {
        "name": "사천시", "num": 6}, {"name": "거창군", "num": 9}, {"name": "고성군", "num": 11}, {"name": "하동군", "num": 12}, {"name": "합천군", "num": 13}, {"name": "남해군", "num": 14}, {"name": "함양군", "num": 15}, {"name": "산청군", "num": 16}, {"name": "의령군", "num": 17}],
    [{"name": "전주시", "num": 0}, {"name": "익산시", "num": 1}, {"name": "군산시", "num": 2}, {"name": "남원시", "num": 6}, {"name": "완주군", "num": 4}, {"name": "진안군", "num": 11}, {"name": "정읍시", "num": 3}, {
        "name": "김제시", "num": 5}, {"name": "고창군", "num": 7}, {"name": "부안군", "num": 8}, {"name": "임실군", "num": 9}, {"name": "순창군", "num": 10}, {"name": "장수군", "num": 12}, {"name": "무주군", "num": 13}],
    [{"name": "순천시", "num": 1}, {"name": "여수시", "num": 0}, {"name": "광양시", "num": 3}, {"name": "보성군", "num": 14}, {"name": "목포시", "num": 2}, {"name": "나주시", "num": 4}, {"name": "장흥군", "num": 16}, {"name": "담양군", "num": 12}, {"name": "강진군", "num": 17}, {"name": "진도군", "num": 19}, {"name": "무안군", "num": 5}, {
        "name": "해남군", "num": 6}, {"name": "고흥군", "num": 7}, {"name": "화순군", "num": 8}, {"name": "영암군", "num": 9}, {"name": "영광군", "num": 10}, {"name": "완도군", "num": 11}, {"name": "장성군", "num": 13}, {"name": "신안군", "num": 9}, {"name": "함평군", "num": 18}, {"name": "곡성군", "num": 20}, {"name": "구례군", "num": 21}],
    None  # 16번 제주 패쓰
]


def getTodayDistrcit():
    response = requests.get(
        'https://apiv3.corona-live.com/domestic/updates.json')
    today_json = response.json()
    today = []
    for item in today_json['updates']:
        all_distrcit = district_table[item['cityId']]
        area = all_area[item['cityId']]
        district = ""
        if all_distrcit != None:
            for dist in all_distrcit:
                if item['guId'] == -1:
                    district = "전체"
                    break
                if dist['num'] == item['guId']:
                    district = dist['name']
                    break
        else:
            district = "전체"
        today.append({
            "area": area,
            "district": district,
            "num": item['cases'],
        })
    return today


print(getTodayDistrcit())
