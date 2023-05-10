import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import * as Util from "@/script/common/util";
import axios from "axios";
import Knex from "knex";
import * as DB from "better-sqlite3";
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
    "/home/yao/www/share/name_generator/resource/science/国家社科基金_项目负责人.json";
  const outputUri =
    "/home/yao/www/share/name_generator/resource/science/古代进士名录.json";

  const db = new DB(
    "/home/yao/www/share/name_generator/resource/good/CBDB_latest.sqlite3"
  );

  // let b = new Knex.Client({
  //   client: "sqlite3",
  // });
  let knex: InstanceType<typeof Knex.Client> = require("knex")({
    client: "sqlite3",
    connection: {
      filename:
        "/home/yao/www/share/name_generator/resource/good/CBDB_latest.sqlite3",
    },
  });
  // let runner = db.prepare(
  //   "select c_personid,c_nianhao_id,c_year,c_age,c_sequence,c_exam_rank from ENTRY_DATA where c_entry_code=36 limit 20"
  // );
  // let recordList = runner.all();

  type Person_进士 = {
    // 朝代
    c_dynasty_chn: string;
    // 姓名
    c_name_chn: string;
    // 姓名-简体
    c_name_chn_simple: string;
    // 考取年份
    c_year: number;
    /**
     * 登科年号
     */
    c_nianhao_chn: string;
    /**
     * 登科年号所在年份
     */
    c_entry_nh_year: number;
    /**
     * 登科年龄
     */
    c_age: string;
    c_sequence: string;
    c_exam_rank: string;
  };

  // 首先, 查出所有成为进士的人
  let record成为进士List: {
    c_personid: number;
    c_nianhao_id: number;
    c_year: number;
    c_age: number | null;
    c_sequence: string | null;
    c_exam_rank: string | null;
    c_entry_nh_year: number;
  }[] = await knex.raw(
    "select c_personid,c_nianhao_id,c_year,c_age,c_sequence,c_exam_rank,c_entry_nh_year from ENTRY_DATA where c_entry_code=36"
  );
  let c_personidList = record成为进士List.map((item) => item.c_personid);
  c_personidList = [...new Set(c_personidList).values()];
  let c_nianhao_idList = record成为进士List.map((item) => item.c_nianhao_id);
  c_nianhao_idList = [...new Set(c_nianhao_idList).values()];
  // 找到相关个人id信息
  let personList = [];
  for (let c_personid of c_personidList) {
    let preson = await knex
      .queryBuilder()
      .select(["c_name_chn", "c_personid"])
      .from("BIOG_MAIN")
      .where("c_personid", c_personid);
    personList.push(preson[0]);
  }

  let personMap: Record<
    string,
    {
      c_name_chn: string;
      c_personid: string;
    }
  > = {};
  for (let person of personList) {
    personMap[person.c_personid] = person;
  }

  // 找到相关年号信息
  let record年号List = await knex
    .queryBuilder()
    .select(["c_nianhao_id", "c_nianhao_chn", "c_dynasty_chn"])
    .from("NIAN_HAO")
    .whereIn("c_nianhao_id", c_nianhao_idList);
  let record年号Map: Record<
    string,
    {
      c_nianhao_id: string;
      c_nianhao_chn: string;
      c_dynasty_chn: string;
    }
  > = {};
  for (let record年号 of record年号List) {
    record年号Map[record年号.c_nianhao_id] = record年号;
  }

  let recordList: Person_进士[] = [];
  for (let record成为进士 of record成为进士List) {
    let record年号 = record年号Map[record成为进士.c_nianhao_id];
    let person = personMap[record成为进士.c_personid];
    if (record年号 === undefined) {
      continue;
    }
    if (person === undefined) {
      continue;
    }

    let item: Person_进士 = {
      // 朝代
      c_dynasty_chn: record年号.c_dynasty_chn,
      // 姓名
      c_name_chn: person.c_name_chn,
      // 姓名-简体
      c_name_chn_simple: t2s4Name(person.c_name_chn),
      // 考取年份
      c_year: record成为进士.c_year,
      /**
       * 登科年号
       */
      c_nianhao_chn: record年号.c_nianhao_chn,
      /**
       * 登科年号所在年份
       */
      c_entry_nh_year: record成为进士.c_entry_nh_year,
      /**
       * 登科年龄
       */
      c_age: record成为进士.c_age ? `${record成为进士.c_age}` : "",
      c_sequence: record成为进士.c_sequence
        ? `${record成为进士.c_sequence}`
        : "",
      c_exam_rank: record成为进士.c_exam_rank
        ? `${record成为进士.c_exam_rank}`
        : "",
    };
    recordList.push(item);
  }

  // client

  // const content = fs.readFileSync(inputUri).toString();
  // let itemList: string[] = JSON.parse(content);
  // let nameList = [];
  // for (let item of itemList) {
  //   // if (item.length === 3) {
  //   nameList.push(item);
  //   // }
  // }

  // let recordList = [...new Set(nameList).values()].sort();

  // let personList = content.split("\n").slice(1, 100);

  fs.writeFileSync(outputUri, JSON.stringify(recordList, null, 2));

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
