--  DAILY_DATA TABLE (종합적인 데이터)
CREATE TABLE daily_data (
    update_date date not null,                      -- 데이터 업데이트 날짜
    daily_confirmed   int not null,                 -- 일일 확진자 수
    daily_isolated    int not null,                 -- 일일 격리자 수
    daily_deseased    int not null,                 -- 일일 사망자 수
    daily_recovered   int not null,                 -- 일일 격리해제자 수
    daily_vacc_once   int not null,                 -- 일일 1차 접종자 수
    daily_vacc_fully  int not null,
    daily_boost       int not null,                 -- 일일 2차 접종자 수
    primary key (update_date),
    CONSTRAINT chk_daily_data CHECK (daily_confirmed >= 0 AND daily_deseased >= 0 AND daily_recovered >= 0 AND daily_vacc_once >= 0)
);

-- AREA TABLE (지역별 데이터)
CREATE TABLE area (
    update_date date not null,                      -- 데이터 업데이트 날짜
    area_name varchar(10) not null,                 -- 지역 이름
    area_confirmed int not null,                    -- 확진자 수
    area_isolated int not null,                     -- 격리자 수
    area_deseased int not null,                     -- 사망자 수
    area_recovered int not null,                    -- 격리해제자 수
    area_dist_level int,
    primary key (area_name, update_date),
    CONSTRAINT chk_area CHECK (area_confirmed >= 0 AND area_deseased >= 0 AND area_recovered >= 0),
    CONSTRAINT chk_area_name CHECK (area_name = '서울' OR area_name = '부산' OR area_name = '대구' OR area_name = '인천' OR area_name = '광주' OR area_name = '대전' OR area_name = '울산' OR area_name = '세종' OR area_name = '경기' OR area_name = '강원' OR area_name = '충북' OR area_name = '충남' OR area_name = '전북' OR area_name = '전남' OR area_name = '경북' OR area_name = '경남' OR area_name = '제주')
);

-- DISTRICT TABLE (지역구 별 데이터)
CREATE TABLE district (
    update_date date not null,                      -- 데이터 업데이트 날짜
    area_name varchar(10) not null,                 -- 지역구 이름
    district varchar(10) not null,                  -- 자치구 이름
    district_confirmed int,                        -- 지역별 확진자 수
    primary key (area_name, district, update_date),
    foreign key (area_name) references area (area_name),
    CONSTRAINT chk_district CHECK (district_confirmed >= 0),
    CONSTRAINT chk_district_name CHECK (
        (area_name = '서울' AND (district = '성북구' OR district = '은평구' OR district = '송파구' OR district = '노원구' OR district = '관악구' OR district = '강동구' OR district = '양천구' OR district = '도봉구' OR district = '동작구' OR district = '광진구' OR district = '강남구' OR district = '중랑구' OR district = '서대문구' OR district = '마포구' OR district = '구로구' OR district = '용산구' OR district = '성동구' OR district = '종로구' OR district = '중구' OR district = '동대문구' OR district = '강북구' OR district = '강서구' OR district = '금천구' OR district = '영등포구' OR district = '서초구'))
        OR (area_name = '부산' AND (district = '중구' OR district = '서구' OR district = '동구' OR district = '영도구' OR district = '부산진구' OR district = '동래구' OR district = '남구' OR district = '북구' OR district = '강서구' OR district = '해운대구' OR district = '사하구' OR district = '금정구' OR district = '연제구' OR district = '수영구' OR district = '사상구' OR district = '기장군'))
        OR (area_name = '대구' AND (district = '남동구' OR district = '서구' OR district = '계양구' OR district = '중구' OR district = '동구' OR district = '강화군' OR district = '미추홀구' OR district = '연수구' OR district = '부평구' OR district = '옹진군'))
        OR (area_name = '인천' AND (district = '중구' OR district = '동구' OR district = '서구' OR district = '남구' OR district = '북구' OR district = '수성구' OR district = '달서구' OR district = '달성군'))
        OR (area_name = '광주' AND (district = '북구' OR district = '서구' OR district = '광산구' OR district = '동구' OR district = '남구'))
        OR (area_name = '대전' AND (district = '동구' OR district = '중구' OR district = '서구' OR district = '대덕구' OR district = '유성구'))
        OR (area_name = '울산' AND (district = '동구' OR district = '북구' OR district = '중구' OR district = '울주군' OR district = '남구'))
        OR (area_name = '세종' AND (district = '세종시'))
        OR (area_name = '경기' AND (district = '고양시' OR district = '성남시' OR district = '용인시' OR district = '수원시' OR district = '안산시' OR district = '안양시' OR district = '평택시' OR district = '시흥시' OR district = '김포시' OR district = '광명시' OR district = '하남시' OR district = '화성시' OR district = '파주시' OR district = '군포시' OR district = '구리시' OR district = '양평군' OR district = '의왕시' OR district = '광주시' OR district = '안성시' OR district = '오산시' OR district = '가평군' OR district = '연천군' OR district = '과천시' OR district = '남양주시' OR district = '동두천시' OR district = '부천시' OR district = '양주시' OR district = '여주시' OR district = '의정부시' OR district = '이천시' OR district = '포천시'))
        OR (area_name = '강원' AND (district = '춘천시' OR district = '원주시' OR district = '홍천군' OR district = '동해시' OR district = '양구군' OR district = '고성군' OR district = '화천군' OR district = '삼척시' OR district = '태백시' OR district = '횡성군' OR district = '정선군' OR district = '강릉시' OR district = '속초시' OR district = '철원군' OR district = '평창군' OR district = '영월군' OR district = '인제군' OR district = '양양군'))
        OR (area_name = '충북' AND (district = '청주시' OR district = '충주시' OR district = '옥천군' OR district = '제천시' OR district = '단양군' OR district = '영동군' OR district = '보은군' OR district = '증평군' OR district = '진천군' OR district = '괴산군' OR district = '음성군'))
        OR (area_name = '충남' AND (district = '아산시' OR district = '천안시' OR district = '홍성군' OR district = '당진시' OR district = '서산시' OR district = '논산시' OR district = '예산군' OR district = '보령시' OR district = '태안군' OR district = '공주시' OR district = '계룡시' OR district = '금산군' OR district = '부여군' OR district = '서천군' OR district = '청양군'))
        OR (area_name = '전북' AND (district = '경산시' OR district = '포항시' OR district = '울진군' OR district = '경주시' OR district = '구미시' OR district = '청도군' OR district = '영덕군' OR district = '김천시' OR district = '성주군' OR district = '안동시' OR district = '영천시' OR district = '문경시' OR district = '영양군' OR district = '영주시' OR district = '상주시' OR district = '군위군' OR district = '의성군' OR district = '청송군' OR district = '고령군' OR district = '칠곡군' OR district = '예천군' OR district = '봉화군' OR district = '울릉군'))
        OR (area_name = '전남' AND (district = '양산시' OR district = '창원시' OR district = '함안군' OR district = '거제시' OR district = '밀양시' OR district = '창녕군' OR district = '김해시' OR district = '진주시' OR district = '통영시' OR district = '사천시' OR district = '거창군' OR district = '고성군' OR district = '하동군' OR district = '합천군' OR district = '남해군' OR district = '함양군' OR district = '산청군' OR district = '의령군'))
        OR (area_name = '경북' AND (district = '전주시' OR district = '익산시' OR district = '군산시' OR district = '남원시' OR district = '완주군' OR district = '진안군' OR district = '정읍시' OR district = '김제시' OR district = '고창군' OR district = '부안군' OR district = '임실군' OR district = '순창군' OR district = '장수군' OR district = '무주군'))
        OR (area_name = '경남' AND (district = '순천시' OR district = '여수시' OR district = '광양시' OR district = '보성군' OR district = '목포시' OR district = '나주시' OR district = '장흥군' OR district = '담양군' OR district = '강진군' OR district = '진도군' OR district = '무안군' OR district = '해남군' OR district = '고흥군' OR district = '화순군' OR district = '영암군' OR district = '영광군' OR district = '완도군' OR district = '장성군' OR district = '신안군' OR district = '함평군' OR district = '곡성군' OR district = '구례군'))
        OR (area_name = '제주' AND (district = '제주'))
    )
);

-- SOCIAL_DIST TABLE (사회적 거리두기 데이터)
CREATE TABLE social_dist (
    dist_level int not null,                        -- 사회적 거리두기 단계
    dist_info varchar(1000) not null,               -- 사회적 거리두기 단계별 정보
    dist_standard varchar(1000) not null,           -- 사회적 거리두기 단계 기준
    dist_gathering int,                             -- 사회적 거리두기 단계별 모임 가능 인원
    primary key (dist_level),
    CONSTRAINT chk_social_dist CHECK (dist_level > 0)
);

-- VACCINE TABLE (백신 데이터)
CREATE TABLE vaccine (
    update_date date not null,                      -- 데이터 업데이트 날짜                  
    vacc_name varchar(10) not null,                 -- 백신 이름   
    vacc_once int not null,                         -- 백신 1차 접종자 수
    vacc_fully int,                                 -- 백신 2차 접종자 수
    vacc_boost int,                                 -- 백신 부스터샷 접종자 수
    primary key (vacc_name, update_date),
    CONSTRAINT chk_vaccine CHECK (vacc_once >= 0),
    CONSTRAINT chk_vaccine_name CHECK (vacc_name = '화이자' OR vacc_name = '모더나' OR vacc_name = '아스트라제네카' OR vacc_name = '얀센')
);

-- USER TABLE (사용자 데이터)
CREATE TABLE user (
    user_name varchar(5) not null,          -- 사용자의 이름
    user_rrn char(14) not null,             -- 사용자의 주민등록번호
    user_sex char(1) not null,              -- 사용자의 성별
    user_area varchar(10) not null,         -- 사용자의 지역(시)
    user_district varchar(10) not null,     -- 사용자의 지역(구)
    user_vacc_name varchar(10),             -- 접종 백신 종류
    user_vaccinated varchar(5),             -- 접종 백신 여부 (미접종 / 1차접종 / 2차 접종 / 부스터샷 접종)
    user_vaccinated_date date,              -- 백신 접종 날짜
    primary key (user_rrn),
    CONSTRAINT chk_user CHECK ((user_sex = 'M' AND substr(user_rrn, 7,1) = 1) OR (user_sex = 'M' AND substr(user_rrn, 7,1) = 3) OR (user_sex = 'W' AND substr(user_rrn, 7, 1) = 2) OR (user_sex = 'W' AND substr(user_rrn, 7, 1) = 4))
);

CREATE TABLE today_area (
    today_area varchar(10) not null,         -- 오늘 확진자 발견된 지역(시)
    today_district varchar (10) not null,    -- 오늘 확진자 발견된 지역(구)
    today_confirmed int not null,            -- 오늘 지역별 확진자 수
    primary key (today_area, today_district),
    CONSTRAINT chk_today_confirmed CHECK (today_confirmed >= 0)
);

CREATE TABLE hospital (
    hospital_area varchar(10) not null,
    hospital_district varchar(10) not null,
    hospital_name varchar(30) not null,
    primary key (hospital_area, hospital_name, hospital_district),
    foreign key (hospital_area) references area (area_name),
    CONSTRAINT chk_hospital_district_name_ CHECK (
        (hospital_area = '서울' AND (hospital_district = '성북구' OR hospital_district = '은평구' OR hospital_district = '송파구' OR hospital_district = '노원구' OR hospital_district = '관악구' OR hospital_district = '강동구' OR hospital_district = '양천구' OR hospital_district = '도봉구' OR hospital_district = '동작구' OR hospital_district = '광진구' OR hospital_district = '강남구' OR hospital_district = '중랑구' OR hospital_district = '서대문구' OR hospital_district = '마포구' OR hospital_district = '구로구' OR hospital_district = '용산구' OR hospital_district = '성동구' OR hospital_district = '종로구' OR hospital_district = '중구' OR hospital_district = '동대문구' OR hospital_district = '강북구' OR hospital_district = '강서구' OR hospital_district = '금천구' OR hospital_district = '영등포구' OR hospital_district = '서초구'))
        OR (hospital_area = '부산' AND (hospital_district = '중구' OR hospital_district = '서구' OR hospital_district = '동구' OR hospital_district = '영도구' OR hospital_district = '부산진구' OR hospital_district = '동래구' OR hospital_district = '남구' OR hospital_district = '북구' OR hospital_district = '강서구' OR hospital_district = '해운대구' OR hospital_district = '사하구' OR hospital_district = '금정구' OR hospital_district = '연제구' OR hospital_district = '수영구' OR hospital_district = '사상구' OR hospital_district = '기장군'))
        OR (hospital_area = '대구' AND (hospital_district = '남동구' OR hospital_district = '서구' OR hospital_district = '계양구' OR hospital_district = '중구' OR hospital_district = '동구' OR hospital_district = '강화군' OR hospital_district = '미추홀구' OR hospital_district = '연수구' OR hospital_district = '부평구' OR hospital_district = '옹진군'))
        OR (hospital_area = '인천' AND (hospital_district = '중구' OR hospital_district = '동구' OR hospital_district = '서구' OR hospital_district = '남구' OR hospital_district = '북구' OR hospital_district = '수성구' OR hospital_district = '달서구' OR hospital_district = '달성군'))
        OR (hospital_area = '광주' AND (hospital_district = '북구' OR hospital_district = '서구' OR hospital_district = '광산구' OR hospital_district = '동구' OR hospital_district = '남구'))
        OR (hospital_area = '대전' AND (hospital_district = '동구' OR hospital_district = '중구' OR hospital_district = '서구' OR hospital_district = '대덕구' OR hospital_district = '유성구'))
        OR (hospital_area = '울산' AND (hospital_district = '동구' OR hospital_district = '북구' OR hospital_district = '중구' OR hospital_district = '울주군' OR hospital_district = '남구'))
        OR (hospital_area = '세종' AND (hospital_district = '세종시'))
        OR (hospital_area = '경기' AND (hospital_district = '고양시' OR hospital_district = '성남시' OR hospital_district = '용인시' OR hospital_district = '수원시' OR hospital_district = '안산시' OR hospital_district = '안양시' OR hospital_district = '평택시' OR hospital_district = '시흥시' OR hospital_district = '김포시' OR hospital_district = '광명시' OR hospital_district = '하남시' OR hospital_district = '화성시' OR hospital_district = '파주시' OR hospital_district = '군포시' OR hospital_district = '구리시' OR hospital_district = '양평군' OR hospital_district = '의왕시' OR hospital_district = '광주시' OR hospital_district = '안성시' OR hospital_district = '오산시' OR hospital_district = '가평군' OR hospital_district = '연천군' OR hospital_district = '과천시' OR hospital_district = '남양주시' OR hospital_district = '동두천시' OR hospital_district = '부천시' OR hospital_district = '양주시' OR hospital_district = '여주시' OR hospital_district = '의정부시' OR hospital_district = '이천시' OR hospital_district = '포천시'))
        OR (hospital_area = '강원' AND (hospital_district = '춘천시' OR hospital_district = '원주시' OR hospital_district = '홍천군' OR hospital_district = '동해시' OR hospital_district = '양구군' OR hospital_district = '고성군' OR hospital_district = '화천군' OR hospital_district = '삼척시' OR hospital_district = '태백시' OR hospital_district = '횡성군' OR hospital_district = '정선군' OR hospital_district = '강릉시' OR hospital_district = '속초시' OR hospital_district = '철원군' OR hospital_district = '평창군' OR hospital_district = '영월군' OR hospital_district = '인제군' OR hospital_district = '양양군'))
        OR (hospital_area = '충북' AND (hospital_district = '청주시' OR hospital_district = '충주시' OR hospital_district = '옥천군' OR hospital_district = '제천시' OR hospital_district = '단양군' OR hospital_district = '영동군' OR hospital_district = '보은군' OR hospital_district = '증평군' OR hospital_district = '진천군' OR hospital_district = '괴산군' OR hospital_district = '음성군'))
        OR (hospital_area = '충남' AND (hospital_district = '아산시' OR hospital_district = '천안시' OR hospital_district = '홍성군' OR hospital_district = '당진시' OR hospital_district = '서산시' OR hospital_district = '논산시' OR hospital_district = '예산군' OR hospital_district = '보령시' OR hospital_district = '태안군' OR hospital_district = '공주시' OR hospital_district = '계룡시' OR hospital_district = '금산군' OR hospital_district = '부여군' OR hospital_district = '서천군' OR hospital_district = '청양군'))
        OR (hospital_area = '전북' AND (hospital_district = '경산시' OR hospital_district = '포항시' OR hospital_district = '울진군' OR hospital_district = '경주시' OR hospital_district = '구미시' OR hospital_district = '청도군' OR hospital_district = '영덕군' OR hospital_district = '김천시' OR hospital_district = '성주군' OR hospital_district = '안동시' OR hospital_district = '영천시' OR hospital_district = '문경시' OR hospital_district = '영양군' OR hospital_district = '영주시' OR hospital_district = '상주시' OR hospital_district = '군위군' OR hospital_district = '의성군' OR hospital_district = '청송군' OR hospital_district = '고령군' OR hospital_district = '칠곡군' OR hospital_district = '예천군' OR hospital_district = '봉화군' OR hospital_district = '울릉군'))
        OR (hospital_area = '전남' AND (hospital_district = '양산시' OR hospital_district = '창원시' OR hospital_district = '함안군' OR hospital_district = '거제시' OR hospital_district = '밀양시' OR hospital_district = '창녕군' OR hospital_district = '김해시' OR hospital_district = '진주시' OR hospital_district = '통영시' OR hospital_district = '사천시' OR hospital_district = '거창군' OR hospital_district = '고성군' OR hospital_district = '하동군' OR hospital_district = '합천군' OR hospital_district = '남해군' OR hospital_district = '함양군' OR hospital_district = '산청군' OR hospital_district = '의령군'))
        OR (hospital_area = '경북' AND (hospital_district = '전주시' OR hospital_district = '익산시' OR hospital_district = '군산시' OR hospital_district = '남원시' OR hospital_district = '완주군' OR hospital_district = '진안군' OR hospital_district = '정읍시' OR hospital_district = '김제시' OR hospital_district = '고창군' OR hospital_district = '부안군' OR hospital_district = '임실군' OR hospital_district = '순창군' OR hospital_district = '장수군' OR hospital_district = '무주군'))
        OR (hospital_area = '경남' AND (hospital_district = '순천시' OR hospital_district = '여수시' OR hospital_district = '광양시' OR hospital_district = '보성군' OR hospital_district = '목포시' OR hospital_district = '나주시' OR hospital_district = '장흥군' OR hospital_district = '담양군' OR hospital_district = '강진군' OR hospital_district = '진도군' OR hospital_district = '무안군' OR hospital_district = '해남군' OR hospital_district = '고흥군' OR hospital_district = '화순군' OR hospital_district = '영암군' OR hospital_district = '영광군' OR hospital_district = '완도군' OR hospital_district = '장성군' OR hospital_district = '신안군' OR hospital_district = '함평군' OR hospital_district = '곡성군' OR hospital_district = '구례군'))
        OR (hospital_area = '제주' AND (hospital_district = '제주'))
    )
)
