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
    CONSTRAINT chk_daily_data CHECK (daily_confirmed >= 0 AND daily_deased >= 0 AND daily_recovered >= 0 AND daily_vacc_once >= 0)

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
    CONSTRAINT chk_area CHECK (area_confirmed >= 0 AND area_deseased >= 0 AND area_recovered >= 0 AND area_dist_level > 0)

);

-- DISTRICT TABLE (지역구 별 데이터)
CREATE TABLE district (
    update_date date not null,                      -- 데이터 업데이트 날짜
    area_name varchar(10) not null,                 -- 지역구 이름
    district varchar(10) not null,                  -- 자치구 이름
    district_confirmed int,                        -- 지역별 확진자 수
    primary key (area_name, district, update_date),
    foreign key (area_name) references area (area_name),
    CONSTRAINT chk_district CHECK (district_confirmed >= 0)
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
    CONSTRAINT chk_vaccine CHECK (vacc_once >= 0)
);

-- USER TABLE (사용자 데이터)
CREATE TABLE user (
    user_name varchar(5) not null,          -- 사용자의 이름
    user_rrn char(13) not null,             -- 사용자의 주민등록번호
    user_sex char(1) not null,              -- 사용자의 성별
    user_area varchar(10) not null,         -- 사용자의 지역(시)
    user_district varchar(10) not null,     -- 사용자의 지역(구)
    user_vacc_name varchar(10),             -- 접종 백신 종류
    user_vaccinated varchar(5),             -- 접종 백신 여부 (미접종 / 1차접종 / 2차 접종 / 부스터샷 접종)
    user_vaccinated_date date,              -- 백신 접종 날짜
    primary key (user_rrn),
    CONSTRAINT chk_user CHECK ((user_sex = 'M' AND substr(user_rrn, 8,1) = 1) OR (user_sex = 'M' AND substr(user_rrn, 8,1) = 3) OR (user_sex = 'W' AND substr(user_rnn, 8, 1) = 2) OR (user_sex = 'W' AND substr(user_rnn, 8, 1) = 4))
);

CREATE TABLE today_area (
    today_area varchar(10) not null,         -- 오늘 확진자 발견된 지역(시)
    today_district varchar (10) not null,    -- 오늘 확진자 발견된 지역(구)
    today_confirmed int not null,            -- 오늘 지역별 확진자 수
    primary key (today_area, today_district),
    CONSTRAINT chk_today_confirmed CHECK (today_confirmed >= 0)
);
