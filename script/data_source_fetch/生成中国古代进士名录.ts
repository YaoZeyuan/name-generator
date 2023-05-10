import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import * as Util from "@/script/common/util";
import Knex from "knex";
import * as OpenCC from "opencc";

const converter = new OpenCC.OpenCC("t2s.json");

async function asyncSleep() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, 50);
  });
}

/**
 * 将姓名从繁体转为简体, 禁止"乾=>干"的转换
 * @param tName
 * @returns
 */
function t2s4Name(tName: string) {
  let sName = converter.convertSync(tName);
  let char姓氏 = sName.slice(0, 1);
  let remain人名 = sName.slice(1);
  remain人名 = remain人名.replaceAll("干", "乾");
  return `${char姓氏}${remain人名}`;
}

/**
 * 临时脚本: 解析科研基金
 */
async function asyncRunner() {
  console.log("开始抓取基金列表");
  const inputUri =
    "/home/yao/www/share/name_generator/resource/science/古代进士名录.json";
  const outputUri =
    "/home/yao/www/share/name_generator/resource/science/古代进士名录.csv";

  const content = fs.readFileSync(inputUri).toString();
  const rawRecordList: Person_进士[] = JSON.parse(content);
  let recordList: string[] = [
    `朝代,姓名,姓名-简体,登科年份,登科年号,登科年号年份,登科年龄,科考成绩`,
  ];

  type Person_进士 = {
    // 朝代
    c_dynasty_chn: string;
    // 姓名
    c_name_chn: string;
    // 姓名-简体
    c_name_chn_simple: string;
    // 登科年份
    c_year: number;
    /**
     * 登科年号
     */
    c_nianhao_chn: string;
    /**
     * 登科年号所在年份
     */
    c_entry_nh_year: string;
    /**
     * 登科年龄
     */
    c_age: string;
    /**
     * 科考成绩
     */
    c_exam_rank: string;
  };
  for (let item of rawRecordList) {
    //     `朝代,姓名,姓名-简体,登科年份,登科年号,登科年号年份,登科年龄,科考成绩`,

    recordList.push(
      `${item.c_dynasty_chn},${item.c_name_chn},${item.c_name_chn_simple},${item.c_year},${item.c_nianhao_chn},${item.c_entry_nh_year},${item.c_age},${item.c_exam_rank}`
    );
  }

  fs.writeFileSync(outputUri, recordList.join("\n"));
  return;

  // const content = fs.readFileSync(inputUri).toString();
  // const lineList = content.split("\n");
  // console.log(`共有${lineList.length}行`);
  // let recordList = [];
  // for (let line of lineList) {
  //   let name: string = line.slice(1);
  //   if (name.length !== 2) {
  //     continue;
  //   }
  //   recordList.push(name);
  // }
  // recordList = [...new Set(recordList).values()].sort((a, b) => {
  //   return b.length - a.length;
  // });

  // fs.writeFileSync(outputUri, JSON.stringify(recordList, null, 2));
}

asyncRunner();
