import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import * as Util from "@/script/common/util";

/**
 * 解析基金中的可用取名字符集
 */

async function asyncRunner() {
  console.log("开始解析基金名");
  let totalUserNameCount = 0;

  const charDB: Type.DB_Char_4_Summary = {};

  const legalCharDbStr = fs
    .readFileSync(Const.Char_Db_total_以字为单位_Uri)
    .toString();

  let inputList = [
    Const.Raw_已公布私募基金名_Uri,
    Const.Raw_私募基金管理公司名称_Uri,
  ];
  for (let inputUri of inputList) {
    // 私募基金名
    const rawContent = fs.readFileSync(path.resolve(inputUri)).toString();
    const fundNameList = rawContent.split("\n");
    for (const fundName of fundNameList) {
      totalUserNameCount++;
      const charList = fundName.split("");
      for (const char of charList) {
        if (Util.is汉字(char) === false) {
          continue;
        }
        // 更新数据库
        if (charDB[char] === undefined) {
          charDB[char] = {
            char,
            count: 1,
          };
        } else {
          charDB[char].count = charDB[char].count + 1;
        }
      }
    }
  }
  let summaryList = Object.values(charDB);
  summaryList.sort((a, b) => {
    return b.count - a.count;
  });
  summaryList = summaryList.filter((item) => {
    if (item.count > 5000) {
      // 排除出现频率在5000以上的字(大概率是基/金/投/资/公/司之类)
      return false;
    }
    return true;
  });
  fs.writeFileSync(
    Const.CharDb_私募基金_用字_字典_Uri,
    JSON.stringify(charDB, null, 2)
  );
  fs.writeFileSync(
    Const.Char_Db_私募基金_用字_列表_Uri,
    JSON.stringify(summaryList, null, 2)
  );
  console.log(
    `执行完毕, 共解析私募名${totalUserNameCount}个, 汇总到${summaryList.length}个可用于起名的字符`
  );
}

asyncRunner();
