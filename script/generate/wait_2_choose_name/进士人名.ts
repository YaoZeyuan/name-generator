import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "@/script/common/util";
import * as RawRecordList from "@/resource/登科录/古代进士名录.json";

type Type_Record = {
  c_personid: 3257;
  c_name_chn: "朱熹" | string;
  c_name_chn_simple: "朱熹" | string;
  c_alt_name_字: "" | string;
  c_alt_name_别号: "仲晦/元晦" | string;
  c_alt_name_别名_曾用名: "晦庵/晦翁/滄洲病叟/紫陽/考亭/遯翁/雲谷老人" | string;
  c_alt_name_字_简体: "" | string;
  c_alt_name_别号_简体: "仲晦/元晦" | string;
  c_alt_name_别名_曾用名_简体:
    | "晦庵/晦翁/沧洲病叟/紫阳/考亭/遯翁/云谷老人"
    | string;
  c_dynasty_chn: "宋" | string;
  c_dynasty_chn_登科: "南宋" | string;
  c_year: 1148;
  c_nianhao_chn: "紹興";
  c_entry_nh_year: 18;
  c_age: "19";
  c_sequence: "1";
  c_exam_rank: "5甲第90";
};

export default async function asyncRunner() {
  console.log("开始根据古代进士列表生成候选名");

  let rawNameList: string[] = [];

  for (let rawRecord of RawRecordList as Type_Record[]) {
    // 按姓名过滤
    let rawName = rawRecord.c_name_chn_simple;
    rawName = util.trans2LegalString(rawName, false);
    rawName = rawName.slice(1);
    if (rawName.length !== 2) {
      // 不考虑非双字名
      continue;
    }
    rawNameList.push(rawName);

    // 按字过滤
    let raw字称List = rawRecord.c_alt_name_字_简体.split("/");
    for (let raw字称 of raw字称List) {
      raw字称 = util.trans2LegalString(raw字称, false);
      if (raw字称.length !== 2) {
        // 不考虑非双字称谓
        continue;
      }
      rawNameList.push(raw字称);
    }
    // 按别号过滤
    let raw别号List = rawRecord.c_alt_name_别号_简体.split("/");
    for (let raw别号 of raw别号List) {
      raw别号 = util.trans2LegalString(raw别号, false);
      if (raw别号.length !== 2) {
        // 不考虑非双字称谓
        continue;
      }
      rawNameList.push(raw别号);
    }
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
  // 去重并排序
  realNameList = [...new Set(realNameList).values()];
  realNameList.sort();

  fs.writeFileSync(
    Const.Name_Db_Uri.登科录_历史进士名,
    JSON.stringify(realNameList, null, 2)
  );

  console.log(
    `根据古代进士列表生成候选名完毕, 共生成${realNameList.length}个候选名`
  );
}
