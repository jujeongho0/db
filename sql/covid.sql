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
    primary key (update_date)
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
    primary key (area_name, update_date)
);

-- DISTRICT TABLE (지역구 별 데이터)
CREATE TABLE district (
    update_date date not null,                      -- 데이터 업데이트 날짜
    area_name varchar(10) not null,                 -- 지역구 이름
    district varchar(10) not null,                  -- 자치구 이름
    district_confirmed int not null,                -- 지역별 확진자 수
    primary key (district, update_date),
    foreign key (area_name) references area (area_name)
);

-- SOCIAL_DIST TABLE (사회적 거리두기 데이터)
CREATE TABLE social_dist (
    dist_level int not null,                        -- 사회적 거리두기 단계
    dist_info varchar(1000) not null,               -- 사회적 거리두기 단계별 정보
    dist_standard varchar(1000) not null,           -- 사회적 거리두기 단계 기준
    dist_gathering int,                             -- 사회적 거리두기 단계별 모임 가능 인원
    primary key (dist_level)
);

-- VACCINE TABLE (백신 데이터)
CREATE TABLE vaccine (
    update_date date not null,                      -- 데이터 업데이트 날짜                  
    vacc_name varchar(10) not null,                 -- 백신 이름   
    vacc_once int not null,                         -- 백신 1차 접종자 수
    vacc_fully int,                                 -- 백신 2차 접종자 수
    vacc_boost int,                                 -- 백신 부스터샷 접종자 수
    primary key (vacc_name, update_date)
);

-- USER TABLE (사용자 데이터)
CREATE TABLE user (
    user_name varchar(5) not null,          -- 사용자의 이름
    user_rrn char(13) not null,             -- 사용자의 주민등록번호
    user_sex char(1) not null,              -- 사용자의 성별
    user_area varchar(10) not null,         -- 사용자의 지역
    user_vacc_name varchar(10),             -- 접종 백신 종류
    user_vacc_boost_name varchar(10),       -- 추가 접종 백신 종류
    user_vaccinated varchar(5),             -- 접종 백신 여부 (미접종 / 1차접종 / 2차 접종 / 부스터샷 접종)
    user_vaccinated_date date,              -- 백신 접종 날짜
    user_state varchar(10),
    primary key (user_rrn)
);

CREATE TABLE real_time_confirmed (
    real_time date not null,                -- 실시간 확진자 업데이트 시간
    real_area varchar(10) not null,         -- 실시간 확진자 발견된 지역
    real_confirmed int not null,            -- 실시간 지역별 확진자 수
    primary key (real_time, real_area)
)