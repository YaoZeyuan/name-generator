import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "./util";
import * as Content_公司名_List from "../../../resource/fund_db/原始数据/私募基金管理公司名称_截至20230507.json";
import * as Content_基金名_List from "../../../resource/fund_db/原始数据/已公布私募基金名_截至20230507.json";

function generateLegalStrList(inputStr: string) {
  let set = new Set<string>();
  for (let startAt = 0; startAt < inputStr.length; startAt++) {
    set.add(inputStr.slice(startAt, startAt + 2));
  }
  return [...set.values()];
}

async function asyncRunner() {
  console.log("开始转换人名数据库");

  let nameList: Type.Type_Name[] = [];
  let rawNameList: string[] = [];
  // 先汇总所有选项
  for (let str_公司名 of Content_公司名_List) {
    rawNameList.push(util.trans2LegalString(str_公司名));
  }
  for (let str_基金名 of Content_基金名_List as string[]) {
    rawNameList.push(util.trans2LegalString(str_基金名));
  }
  // 生成所有2字名
  let obj: Record<
    string,
    {
      content: string;
      count: number;
    }
  > = {};
  for (let rawName of rawNameList) {
    let allStrList = generateLegalStrList(rawName);
    for (let str of allStrList) {
      if (str.length !== 2) {
        continue;
      }
      if (obj[str] === undefined) {
        obj[str] = {
          content: str,
          count: 1,
        };
      } else {
        obj[str].count++;
      }
    }
  }

  fs.writeFileSync(
    Const.Name_Db_财富论_基金选名_Uri,
    JSON.stringify(obj, null, 2)
  );

  console.log("人名数据库处理完毕");
}

asyncRunner();
