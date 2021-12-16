const fs = require("fs");

// DAILY TABLE
// const Daily_jsonFile = fs.readFileSync(
//   "../최종_크롤링데이터_/FF_DAILY.json",
//   "utf8"
// );
// // console.log(Area_jsonFile);
// const Daily_jsonData = JSON.parse(Daily_jsonFile.toString().trim());
// // console.log(Area_jsonData);
// const result = Daily_jsonData.DAILY.filter(
//   (v) => new Date(v.DATE) >= new Date("2021-12-01")
// )
//   .map(
//     (
//       v
//     ) => `INSERT INTO daily_data(update_date, daily_confirmed, daily_isolated, daily_deseased, daily_recovered, daily_vacc_once, daily_vacc_fully, daily_boost)
// VALUES('${v.DATE}',${v.CONFIRMED},${v.ISOLATED},${v.DESEASED},${v.RECOVERED},${v.VACC_ONCE},${v.VACC_FULLY},${v.VACC_BOOST});`
//   )
//   .join("\n");
// console.log(result);

// // AREA TABLE

// const Area_jsonFile = fs.readFileSync(
//   "../최종_크롤링데이터_/FF_AREA.json",
//   "utf8"
// );
// //console.log(Area_jsonFile);
// const Area_jsonData = JSON.parse(Area_jsonFile.toString().trim());

// const result = Area_jsonData.AREA.filter(
//   (v) => new Date(v.DATE) >= new Date("2021-12-01")
// )
//   .map(
//     (
//       v
//     ) => `INSERT INTO area(update_date, area_name, area_confirmed, area_isolated, area_deseased, area_recovered, area_dist_level)
// VALUES('${v.DATE}','${v.NAME}',${v.CONFIRMED},${v.ISOLATED},${v.DESEASED},${v.RECOVERED},${v.DIST_LEVEL});`
//   )

//   .join("\n");
// console.log(result);

// // DISTRCT TABLE
// const District_jsonFile = fs.readFileSync('../크롤링 데이터/DISTRICT_TEMP.json', 'utf8');
// // console.log(District_jsonFile);
// const District_jsonData = JSON.parse(District_jsonFile.toString().trim());
// // console.log(District_jsonData);
// const district_result = District_jsonData.DISTRICT.map(v => `INSERT INTO district(update_date, area_name, district, district_confirmed)
// VALUES('${v.DATE}','${v.AREA}','${v.DISTRICT}',${v.CONFIRMED});`).join('\n');
// // console.log(district_result);

// // DISTRCT TABLE
// const District_jsonFile = fs.readFileSync(
//   "../최종_크롤링데이터_/FF_DISTRICT.json",
//   "utf8"
// );
// // console.log(District_jsonFile);
// const District_jsonData = JSON.parse(District_jsonFile.toString().trim());
// // console.log(District_jsonData);
// const result = District_jsonData.DISTRICT.filter(
//   (v) => new Date(v.DATE) >= new Date("2021-12-01")
// )
//   .map(
//     (
//       v
//     ) => `INSERT INTO district(update_date, area_name, district, district_confirmed)
// VALUES('${v.DATE}','${v.AREA}','${v.DISTRICT}',${v.CONFIRMED});`
//   )
//   .join("\n");

// // VACCINE TABLE

const Vaccine_jsonFile = fs.readFileSync(
  "../최종_크롤링데이터_/VACCINE.json",
  "utf8"
);
// console.log(Vaccine_jsonFile);
const Vaccine_jsonData = JSON.parse(Vaccine_jsonFile.toString().trim());
// console.log(Vaccine_jsonData);
const result = Vaccine_jsonData.VACCINE.filter(
  (v) => new Date(v.DATE) >= new Date("2021-12-01")
)
  .map(
    (
      v
    ) => `INSERT INTO vaccine(update_date, vacc_name, vacc_once, vacc_fully, vacc_boost)
VALUES('${v.DATE}','${v.NAME}',${v.VACC_ONCE},${v.VACC_FULLY}, ${v.VACC_BOOST});`
  )
  .join("\n");

// // SOCIAL_DIST TABLE
// const Social_Dist_jsonFile = fs.readFileSync('../크롤링 데이터/SOCIAL_DIST.json', 'utf8');
// // console.log(Social_Dist_jsonFile);
// const Social_Dist_jsonData = JSON.parse(Social_Dist_jsonFile.toString().trim());
// // console.log(Social_Dist_jsonData);
// const social_dist_result = Social_Dist_jsonData.SOCIAL_DIST.map(v => `INSERT INTO social_dist(dist_level, dist_info, dist_standard, dist_gathering)
// VALUES('${v.DIST_LEVEL}','${v.DIST_INFO}','${v.STANDARD}',${v.GATHERING});`).join('\n');
// // console.log(social_dist_result);

// HOSPITAL TABLE
// const Hospital_jsonFile = fs.readFileSync(
//   "../최종_크롤링데이터_/HOSPITAL.json",
//   "utf8"
// );
// const Hospital_jsonData = JSON.parse(Hospital_jsonFile.toString().trim());
// const hospital_result = Hospital_jsonData.HOSPITAL.map(
//   (v) => `INSERT INTO hospital(hospital_area, hospital_district, hospital_name)
// VALUES('${v.AREA}','${v.DISTRICT}','${v.NAME}');`
// ).join("\n");

// console.log(social_dist_result);

// // Fianl_DATA
// final_result = daily_result + '\n' + area_result + '\n' + district_result + '\n' + vaccine_result + '\n' + social_dist_result;

fs.writeFileSync("./vacc.txt", result, { encoding: "utf8" });
