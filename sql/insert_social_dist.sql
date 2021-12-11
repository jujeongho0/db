
-- 사회적 거리두기
INSERT INTO social_dist(dist_level, dist_info, dist_standard, dist_gathering)
VALUES('4','대유행(외출 금지)','인구 10만명당 4명 이상',4);
INSERT INTO social_dist(dist_level, dist_info, dist_standard, dist_gathering)
VALUES('3','권역 유행(모임 금지)','인구 10만명당 2명 이상',4);
INSERT INTO social_dist(dist_level, dist_info, dist_standard, dist_gathering)
VALUES('2','지역 유행(인원 제한)','인구 10만명당 1명 이상',8);
INSERT INTO social_dist(dist_level, dist_info, dist_standard, dist_gathering)
VALUES('1','지속적 억제상태 유지','인구 10만명당 1명 미만',null);