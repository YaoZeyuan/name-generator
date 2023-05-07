import * as path from "path";
import * as fs from "fs";
import * as Const from "../common/const";
import * as Type from "../common/type";
import axios from "axios";

async function asyncSleep() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, 50);
  });
}

/**
 * 将汉典数据转换为json
 */
async function asyncRunner() {
  console.log("开始抓取基金列表");
  const uriList = [
    "/home/yao/www/share/name_generator/database/fund_db/私募基金汇总_至1198页.json",
    "/home/yao/www/share/name_generator/database/fund_db/私募基金汇总_至2097页.json",
    "/home/yao/www/share/name_generator/database/fund_db/私募基金汇总.json",
  ];
  const recordList: {
    fundName: string;
    managerName: string;
  }[] = [];
  for (let uri of uriList) {
    const str = fs.readFileSync(uri).toString();
    const rawRecordList = JSON.parse(str);
    for (let rawRecord of rawRecordList) {
      recordList.push({
        fundName: rawRecord.fundName,
        managerName: rawRecord.managerName,
      });
    }
  }

  let fundNameList: string[] = [];
  let fundCropList: string[] = [];
  for (let rawRecord of recordList) {
    fundNameList.push(rawRecord.fundName.trim());
    fundCropList.push(rawRecord.managerName.trim());
  }

  fundNameList = Array.from(new Set(fundNameList));
  fundCropList = Array.from(new Set(fundCropList));
  fundNameList.sort();
  fundCropList.sort();

  fs.writeFileSync(
    "/home/yao/www/share/name_generator/database/fund_db/私募基金管理人名称_截至2018年.txt",
    JSON.stringify(fundCropList, null, 2)
  );
  fs.writeFileSync(
    "/home/yao/www/share/name_generator/database/fund_db/已公布私募基金名_截至2018年.txt",
    JSON.stringify(fundNameList, null, 2)
  );
  console.log("字典文件处理完毕");
}

asyncRunner();
