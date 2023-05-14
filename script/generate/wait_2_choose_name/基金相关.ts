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
  let nameList_精选方案: Type.Type_Name[] = [];
  let nameList_集思广益: Type.Type_Name[] = [];
  let rawNameList: string[] = [];
  // 先汇总所有选项
  for (let str_公司名 of Content_公司名_List) {
    let legalName = str_公司名
      .split("")
      .filter((item) => {
        return util.is汉字(item);
      })
      .join("");
    let allStrList = generateLegalStrList(legalName);
    for (let item of allStrList) {
      rawNameList.push(item);
    }
  }
  for (let str_基金名 of Content_基金名_List as string[]) {
    let legalName = str_基金名
      .split("")
      .filter((item) => {
        return util.is汉字(item);
      })
      .join("");
    let allStrList = generateLegalStrList(legalName);
    for (let item of allStrList) {
      rawNameList.push(item);
    }
  }
  rawNameList = rawNameList.filter((item) => {
    // 排除所有长度不为2的选项
    return item.length === 2;
  });

  // 生成所有2字名
  let obj: Record<
    string,
    {
      content: string;
      count: number;
    }
  > = {};
  for (let str of rawNameList) {
    if (obj[str] === undefined) {
      obj[str] = {
        content: str,
        count: 1,
      };
    } else {
      obj[str].count++;
    }
  }

  let optionList_原始数据 = Object.values(obj);
  optionList_原始数据.sort((a, b) => {
    return b.count - a.count;
  });
  // 基金用字相对较好, 相关提供两个数据库
  // 一个是精选, 只记录出现频率在3~300之间的词
  // 一个是集思广益, 记录只出现1~2次的词, 用于撞运气----换个角度想, 如果一个基金经理做了10年, 同系列基金发不出3个产品(eg:梦想一号/梦想二号/梦想三号/...), 本身也有问题
  // 只保留出现频率在3~300之间的二字词
  let optionList_精选方案 = optionList_原始数据.filter((item) => {
    if (3 <= item.count && item.count < 300) {
      return true;
    }
    return false;
  });
  // 集思广益, 仅出现了1/2次的方案
  let optionList_集思广益 = optionList_原始数据.filter((item) => {
    if (item.count < 3) {
      return true;
    }
    return false;
  });

  // 排除所有带多音字的情况-若2字字符串中含有多音字, 则过滤后的字符串长度一定小于2
  optionList_精选方案 = optionList_精选方案.filter((item) => {
    let newStr = util.trans2LegalString(item.content, true);
    return newStr.length === 2;
  });
  optionList_集思广益 = optionList_集思广益.filter((item) => {
    let newStr = util.trans2LegalString(item.content, true);
    return newStr.length === 2;
  });

  let rawNameItemList_精选方案 = optionList_精选方案.map((item) => {
    return util.transName2Record(item.content);
  });
  for (let rawNameItem of rawNameItemList_精选方案) {
    if (rawNameItem !== false) {
      nameList_精选方案.push(rawNameItem);
    }
  }
  let rawNameItemList_集思广益 = optionList_集思广益.map((item) => {
    return util.transName2Record(item.content);
  });
  for (let rawNameItem of rawNameItemList_集思广益) {
    if (rawNameItem !== false) {
      nameList_集思广益.push(rawNameItem);
    }
  }

  let realNameList_精选方案 = nameList_精选方案.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });
  // 去重并排序
  realNameList_精选方案 = [...new Set(realNameList_精选方案).values()];
  realNameList_精选方案.sort();

  let realNameList_集思广益 = nameList_集思广益.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });
  // 去重并排序
  realNameList_集思广益 = [...new Set(realNameList_集思广益).values()];
  realNameList_集思广益.sort();

  fs.writeFileSync(
    Const.Name_Db_Uri.财富论_私募基金_精选集,
    JSON.stringify(realNameList_精选方案, null, 2)
  );
  fs.writeFileSync(
    Const.Name_Db_Uri.财富论_私募基金_集思录,
    JSON.stringify(realNameList_集思广益, null, 2)
  );

  console.log(
    `根据基金名生成候选名完毕, 生成精选方案${realNameList_精选方案.length}个候选名, 生成集思广益方案${realNameList_集思广益.length}个候选名`
  );
}
