import * as fs from "fs";
import * as Type from "@/script/common/type";
import * as Const from "@/script/common/const";
import * as util from "@/script/common/util";
import * as Content_公司名_List from "@/resource/fund_db/原始数据/私募基金管理公司名称_截至20230507.json";
import * as Content_基金名_List from "@/resource/fund_db/原始数据/已公布私募基金名_截至20230507.json";
import * as jieba from "nodejieba";

function generateLegalStrList(inputStr: string) {
  let set = new Set<string>();
  let oldWordList = jieba.cut(inputStr);
  let wordList: string[] = [];
  for (let pos = 0; pos < oldWordList.length; pos++) {
    if (oldWordList[pos].length === 1) {
      // 如果分词结果只有一个字, 且下组分词也是单字, 则尝试和下组第一个字进行合并
      if (oldWordList[pos + 1]?.length === 1) {
        wordList.push(oldWordList[pos] + oldWordList[pos + 1]);
        // 跳过下组分词
        pos = pos + 1;
      } else {
        // 否则直接略过
      }
    } else {
      wordList.push(oldWordList[pos]);
    }
  }
  return wordList;
}

export default async function asyncRunner() {
  console.log("开始根据基金名, 生成候选二字名");

  jieba.load();
  let nameList: Type.Type_Name[] = [];
  let rawNameList: string[] = [];
  // 先汇总所有选项
  for (let str_公司名 of Content_公司名_List) {
    let legalName = util.trans2LegalString(str_公司名);
    let allStrList = generateLegalStrList(legalName);
    for (let item of allStrList) {
      rawNameList.push(item);
    }
  }
  for (let str_基金名 of Content_基金名_List as string[]) {
    let legalName = util.trans2LegalString(str_基金名);
    let allStrList = generateLegalStrList(legalName);
    for (let item of allStrList) {
      rawNameList.push(item);
    }
  }
  // 生成所有2字名
  let obj: Record<
    string,
    {
      content: string;
      count: number;
    }
  > = {};
  for (let str of rawNameList) {
    if (str.length !== 2) {
      // 只收集2字的分词
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

  let optionList = Object.values(obj);
  optionList.sort((a, b) => {
    return b.count - a.count;
  });
  // 只保留出现频率在5~300之间的二字词
  optionList = optionList.filter((item) => {
    if (5 < item.count && item.count < 300) {
      return true;
    }
    return false;
  });
  let rawNameItemList = optionList.map((item) => {
    return util.transName2Record(item.content);
  });
  for (let rawNameItem of rawNameItemList) {
    if (rawNameItem !== false) {
      nameList.push(rawNameItem);
    }
  }

  let realNameList = nameList.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });

  fs.writeFileSync(
    Const.Name_Db_Uri.财富论_基金选名,
    JSON.stringify(realNameList, null, 2)
  );

  console.log(`根据基金名生成候选名完毕, 共生成${realNameList.length}个候选名`);
}
