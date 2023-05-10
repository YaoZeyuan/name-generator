import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "@/script/common/util";
import * as RawRecordList from "@/resource/登科录/古代进士名录.json";

type Type_Record = {
  c_dynasty_chn: "明";
  c_name_chn: "黃閏";
  c_name_chn_simple: "黄闰" | string;
  c_year: 0;
  c_nianhao_chn: "永乐";
  c_entry_nh_year: "";
  c_age: "";
  c_exam_rank: "";
};

export default async function asyncRunner() {
  console.log("开始根据古代进士列表生成候选名");

  let rawNameList: string[] = [];

  for (let rawRecord of RawRecordList as Type_Record[]) {
    let rawName = rawRecord.c_name_chn_simple;
    rawName = util.trans2LegalString(rawName);
    if (rawName.length !== 2) {
      // 不考虑非双字名
      continue;
    }
    rawNameList.push(rawName);
  }
  rawNameList = [...new Set(rawNameList).values()];
  let nameList: Type.Type_Name[] = [];
  for (let rawName of rawNameList) {
    let legalName = util.transName2Record(rawName);
    if (legalName !== false) {
      nameList.push(legalName);
    }
  }

  let realNameList = nameList.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });

  fs.writeFileSync(
    Const.Name_Db_Uri.登科录_历史进士名,
    JSON.stringify(realNameList, null, 2)
  );

  console.log(
    `根据古代进士列表生成候选名完毕, 共生成${realNameList.length}个候选名`
  );
}
