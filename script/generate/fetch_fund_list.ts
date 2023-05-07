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
  const str = fs.readFileSync(Const.Char_Db_私募汇总_Uri).toString();
  const rawRecordList: {
    fundName: string;
    managerName: string;
  }[] = JSON.parse(str);
  let fundNameList: string[] = [];
  let fundCropList: string[] = [];
  for (let rawRecord of rawRecordList) {
    fundNameList.push(rawRecord.fundName);
    fundCropList.push(rawRecord.managerName);
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

/**
 * 将汉典数据转换为json
 */
async function asyncFetch() {
  console.log("开始抓取基金列表");
  let recordList: any[] = [];
  for (let pageNo = 2097; pageNo < 2157; pageNo++) {
    console.log(`开始获取第${pageNo + 1}页数据`);
    let res = await axios.post(
      `https://gs.amac.org.cn/amac-infodisc/api/pof/fund?rand=0.028522124553462813&page=${pageNo}&size=100`,
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "zh-CN,zh;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
        },
      }
    );
    const data = res.data;
    for (let item of data.content) {
      recordList.push(item);
    }
    console.log(
      `第${pageNo}页数据获取完毕, 目前共获取数据${recordList.length}条`
    );
    fs.writeFileSync(
      Const.Char_Db_私募汇总_Uri,
      JSON.stringify(recordList, null, 2)
    );
    await asyncSleep();
  }
  fs.writeFileSync(
    Const.Char_Db_私募汇总_Uri,
    JSON.stringify(recordList, null, 2)
  );
  console.log("字典文件处理完毕");
}

asyncFetch();
