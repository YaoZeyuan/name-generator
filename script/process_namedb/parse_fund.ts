import * as path from "path";
import * as fs from "fs";
import * as Const from "../common/const";
import * as Type from "../common/type";

async function asyncRunner() {
  console.log("开始解析基金名");
  let totalUserNameCount = 0;

  const charDB: Type.CharDB = {};

  const legalCharDbStr = fs
    .readFileSync(Const.Char_Db_total_以字为单位_Uri)
    .toString();
  const legalCharDb = JSON.parse(legalCharDbStr);

  // 获取人名库列表
  const rawFileNameList = fs.readdirSync(Const.Raw_已知私募基金名_Path);
  // 只读取txt文件
  const fileNameList = rawFileNameList.filter((item) => item.endsWith(".txt"));

  for (let filename of fileNameList) {
    const rawContent = fs
      .readFileSync(path.resolve(Const.Raw_已知私募基金名_Path, filename))
      .toString();
    const fundNameList = rawContent.split("\n");
    for (const fundName of fundNameList) {
      totalUserNameCount++;
      const charList = fundName.split("");
      for (const char of charList) {
        if (legalCharDb[char] === undefined) {
          // 不考虑拼音库中没有的字符
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
    if (item.count > 5000 || item.count < 15) {
      // 排除出现频率在5000以上的字(大概率是基/金/投/资/公/司之类) 和出现频率过低的字(说明基金经理们普遍不认可)
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    Const.Char_Db_私募用字列表_Uri,
    JSON.stringify(summaryList, null, 4)
  );
  fs.writeFileSync(
    Const.Char_Db_私募用字统计_Uri,
    JSON.stringify(charDB, null, 4)
  );

  let rawPlainCharList = summaryList.map((item) => item.char);
  let plainCharList: string[] = [];
  let counter = 0;
  for (let char of rawPlainCharList) {
    counter++;
    plainCharList.push(char);
    if (counter % 50 === 0) {
      plainCharList.push("\n");
    }
  }
  fs.writeFileSync(Const.Char_Db_私募用字txt_Uri, plainCharList.join(""));

  console.log(
    `执行完毕, 共解析私募名${totalUserNameCount}个, 汇总到${summaryList.length}个可用于起名的字符`
  );
}

asyncRunner();
