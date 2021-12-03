const fs = require('fs');


// DAILY TABLE
const Daily_jsonFile = fs.readFileSync('../크롤링 데이터/DAILY_TEMP.json', 'utf8');
// console.log(Area_jsonFile);
const Daily_jsonData = JSON.parse(Daily_jsonFile.toString().trim());
// console.log(Area_jsonData);
const daily_result = Daily_jsonData.DAILY.map(v => `INSERT INTO daily_data(update_date, daily_confirmed, daily_isolated, daily_deseased, daily_recovered, daily_vacc_once, daily_vacc_fully, daily_boost)
VALUES('${v.DATE}','${v.CONFIRMED}',${v.ISOLATED},${v.DESEASED},${v.RECOVERED},${v.VACC_ONCE},${v.VACC_FULLY},${v.VACC_BOOST});`).join('\n');
// console.log(area_result);


// AREA TABLE
const Area_jsonFile = fs.readFileSync('../크롤링 데이터/AREA_TEMP.json', 'utf8');
// console.log(Area_jsonFile);
const Area_jsonData = JSON.parse(Area_jsonFile.toString().trim());
// console.log(Area_jsonData);
const area_result = Area_jsonData.AREA.map(v => `INSERT INTO area(update_date, area_name, area_confirmed, area_isolated, area_deseased, area_recovered, area_dist_level)
VALUES('${v.DATE}','${v.NAME}',${v.CONFIRMED},${v.ISOLATED},${v.DESEASED},${v.RECOVERED},${v.DIST_LEVEL});`).join('\n');
// console.log(area_result);


// DISTRCT TABLE
const District_jsonFile = fs.readFileSync('../크롤링 데이터/DISTRICT_TEMP.json', 'utf8');
// console.log(District_jsonFile);
const District_jsonData = JSON.parse(District_jsonFile.toString().trim());
// console.log(District_jsonData);
const district_result = District_jsonData.DISTRICT.map(v => `INSERT INTO district(update_date, area_name, district, district_confirmed)
VALUES('${v.DATE}','${v.AREA}','${v.DISTRICT}',${v.CONFIRMED});`).join('\n');
// console.log(district_result);


// VACCINE TABLE
const Vaccine_jsonFile = fs.readFileSync('../크롤링 데이터/VACCINE_TEMP.json', 'utf8');
// console.log(Vaccine_jsonFile);
const Vaccine_jsonData = JSON.parse(Vaccine_jsonFile.toString().trim());
// console.log(Vaccine_jsonData);
const vaccine_result = Vaccine_jsonData.VACCINE.map(v => `INSERT INTO vaccine(update_date, vacc_name, vacc_once, vacc_fully, vacc_boost)
VALUES('${v.DATE}','${v.NAME}',${v.VACC_ONCE},${v.VACC_FULLY}, ${v.VACC_BOOST});`).join('\n');
// console.log(vaccine_result);

// Fianl_DATA
final_result = daily_result + '\n' + area_result + '\n' + district_result + '\n' + vaccine_result;
console.log(final_result);
fs.writeFileSync("result.txt", final_result, {encoding: 'utf8'});