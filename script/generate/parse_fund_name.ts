import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";

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
  const legalCharDb = JSON.parse(legalCharDbStr);

  let inputList = [
    {
      inputUri: Const.Raw_已公布私募基金名_Uri,
      listOutUri: Const.Char_Db_私募基金名_用字_列表_Uri,
      txtOutUri: Const.Char_Db_私募基金名_用字_纯文本_Uri,
    },
    {
      inputUri: Const.Raw_私募基金管理公司名称_Uri,
      listOutUri: Const.Char_Db_私募基金公司_用字_列表_Uri,
      txtOutUri: Const.Char_Db_私募基金公司_用字_纯文本_Uri,
    },
  ];
  for (let inputRecord of inputList) {
    // 私募基金名
    const rawContent = fs
      .readFileSync(path.resolve(inputRecord.inputUri))
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
      inputRecord.listOutUri,
      JSON.stringify(summaryList, null, 4)
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
    fs.writeFileSync(inputRecord.txtOutUri, plainCharList.join(""));
    console.log(
      `执行完毕, 共解析私募名${totalUserNameCount}个, 汇总到${summaryList.length}个可用于起名的字符`
    );
  }
}

asyncRunner();
