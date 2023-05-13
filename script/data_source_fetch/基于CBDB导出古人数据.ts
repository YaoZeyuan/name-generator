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
  console.log("开始生成古人信息列表");

  console.log(
    "Const.Raw_CBDB_中国历代人物传记资料库_Uri => ",
    Const.Raw_CBDB_中国历代人物传记资料库_Uri
  );
  // 数据库结构见:https://projects.iq.harvard.edu/chinesecbdb/%E4%B8%8B%E8%BC%89%E6%95%99%E5%AD%B8%E8%88%87%E8%BC%94%E5%8A%A9%E6%96%87%E4%BB%B6
  let knex: InstanceType<typeof Knex.Client> = require("knex")({
    client: "sqlite3",
    connection: {
      filename: Const.Raw_CBDB_中国历代人物传记资料库_Uri,
    },
  });
  // let runner = db.prepare(
  //   "select c_personid,c_nianhao_id,c_year,c_age,c_sequence,c_exam_rank from ENTRY_DATA where c_entry_code=36 limit 20"
  // );
  // let recordList = runner.all();

  type Person_进士 = {
    // 人物id
    c_personid: string;
    // 朝代
    c_dynasty_chn: string;
    // 姓名
    c_name_chn: string;
    // 姓名-简体
    c_name_chn_simple: string;
    c_alt_name_字: string;
    c_alt_name_别号: string;
    c_alt_name_别名_曾用名: string;
    c_alt_name_字_简体: string;
    c_alt_name_别号_简体: string;
    c_alt_name_别名_曾用名_简体: string;
    c_alt_name_谥号: string;
    c_alt_name_谥号_简体: string;
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

  console.log("查询所有成为进士的人");
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
  console.log(`共查询到${c_personidList.length}个古人id`);
  let c_nianhao_idList = record成为进士List.map((item) => item.c_nianhao_id);
  c_nianhao_idList = [...new Set(c_nianhao_idList).values()];
  // 找到相关个人id信息
  console.log(`根据古人id查询古人信息`);

  let personList: any[] = [];
  let bufPersonIdList: number[] = [];

  // 相关的别名数据 => select * from altname_codes
  // select c_alt_name_chn,c_alt_name_type_code from altname_data limit 100
  // 3	Alternate Personal Name, Previously Used Name	别名、曾用名
  // 4	Courtesy name	字
  // 5	Studio name, Style name	室名、別號
  // 6	Posthumous Name	諡號
  // 别名类别代码 => select * from altname_codes limit 100
  let personAliasNameMap: Record<
    string,
    {
      c_alt_name_字: string;
      c_alt_name_别号: string;
      c_alt_name_别名_曾用名: string;
      c_alt_name_谥号: string;
      c_alt_name_字_简体: string;
      c_alt_name_别号_简体: string;
      c_alt_name_别名_曾用名_简体: string;
      c_alt_name_谥号_简体: string;
    }
  > = {};

  type RawAliasNameInfo = {
    c_alt_name_字: string[];
    c_alt_name_别号: string[];
    c_alt_name_别名_曾用名: string[];
    c_alt_name_谥号: string[];
  };
  type DB_RawAliasNameInfo = Record<number, RawAliasNameInfo>;
  let rawDbRawAliasNameInfo: DB_RawAliasNameInfo = {};

  for (let c_personid of c_personidList) {
    bufPersonIdList.push(c_personid);
    if (bufPersonIdList.length > 20) {
      let rawPresonList = await knex
        .queryBuilder()
        .select(["c_name_chn", "c_personid"])
        .from("BIOG_MAIN")
        .whereIn("c_personid", bufPersonIdList);
      personList = personList.concat(rawPresonList);

      let rawPresonAliasNameList = await knex
        .queryBuilder()
        .select(["c_personid", "c_alt_name_chn", "c_alt_name_type_code"])
        .from("altname_data")
        .whereIn("c_personid", bufPersonIdList);

      for (let presonAliasName of rawPresonAliasNameList) {
        let personId = presonAliasName.c_personid;
        if (rawDbRawAliasNameInfo[personId] === undefined) {
          rawDbRawAliasNameInfo[personId] = {
            c_alt_name_字: [],
            c_alt_name_别号: [],
            c_alt_name_别名_曾用名: [],
            c_alt_name_谥号: [],
          };
        }
        let rawNameInfo: RawAliasNameInfo = rawDbRawAliasNameInfo[personId];

        switch (presonAliasName.c_alt_name_type_code) {
          case 3:
            rawNameInfo["c_alt_name_字"].push(presonAliasName.c_alt_name_chn);
            break;
          case 4:
            rawNameInfo["c_alt_name_别号"].push(presonAliasName.c_alt_name_chn);
            break;
          case 5:
            rawNameInfo["c_alt_name_别名_曾用名"].push(
              presonAliasName.c_alt_name_chn
            );
            break;
          case 6:
            rawNameInfo["c_alt_name_谥号"].push(presonAliasName.c_alt_name_chn);
            break;
        }
      }
      bufPersonIdList = [];
    }
  }
  if (bufPersonIdList.length > 0) {
    let rawPresonList = await knex
      .queryBuilder()
      .select(["c_name_chn", "c_personid"])
      .from("BIOG_MAIN")
      .whereIn("c_personid", bufPersonIdList);
    personList = personList.concat(rawPresonList);

    let rawPresonAliasNameList = await knex
      .queryBuilder()
      .select(["c_personid", "c_alt_name_chn", "c_alt_name_type_code"])
      .from("altname_data")
      .whereIn("c_personid", bufPersonIdList);

    for (let presonAliasName of rawPresonAliasNameList) {
      let personId = presonAliasName.c_personid;
      if (rawDbRawAliasNameInfo[personId] === undefined) {
        rawDbRawAliasNameInfo[personId] = {
          c_alt_name_字: [],
          c_alt_name_别号: [],
          c_alt_name_别名_曾用名: [],
          c_alt_name_谥号: [],
        };
      }
      let rawNameInfo: RawAliasNameInfo = rawDbRawAliasNameInfo[personId];

      switch (presonAliasName.c_alt_name_type_code) {
        case 3:
          rawNameInfo["c_alt_name_字"].push(presonAliasName.c_alt_name_chn);
          break;
        case 4:
          rawNameInfo["c_alt_name_别号"].push(presonAliasName.c_alt_name_chn);
          break;
        case 5:
          rawNameInfo["c_alt_name_别名_曾用名"].push(
            presonAliasName.c_alt_name_chn
          );
          break;
        case 6:
          rawNameInfo["c_alt_name_谥号"].push(presonAliasName.c_alt_name_chn);
          break;
      }
    }

    bufPersonIdList = [];
  }
  for (let c_personid of Object.keys(rawDbRawAliasNameInfo)) {
    let rawNameInfo = rawDbRawAliasNameInfo[c_personid as unknown as number];
    personAliasNameMap[c_personid] = {
      c_alt_name_字: rawNameInfo.c_alt_name_字.join("/"),
      c_alt_name_别号: rawNameInfo.c_alt_name_别号.join("/"),
      c_alt_name_别名_曾用名: rawNameInfo.c_alt_name_别名_曾用名.join("/"),
      c_alt_name_谥号: rawNameInfo.c_alt_name_谥号.join("/"),
      c_alt_name_字_简体: t2s4Name(rawNameInfo.c_alt_name_字.join("/")),
      c_alt_name_别号_简体: t2s4Name(rawNameInfo.c_alt_name_别号.join("/")),
      c_alt_name_别名_曾用名_简体: t2s4Name(
        rawNameInfo.c_alt_name_别名_曾用名.join("/")
      ),
      c_alt_name_谥号_简体: t2s4Name(rawNameInfo.c_alt_name_谥号.join("/")),
    };
  }

  console.log(`共查询到${personList.length}条古人信息`);
  console.log(
    `共查询到${Object.keys(personAliasNameMap).length}条相关古人别名信息`
  );
  let personMap: Record<
    string,
    {
      c_name_chn: string;
      c_personid: string;
    }
  > = {};
  for (let person of personList) {
    if (personMap[person.c_personid] !== undefined) {
      console.log("原记录 => ", personMap[person.c_personid]);
      console.log("新记录 => ", person);
    }
    personMap[person.c_personid] = person;
  }
  console.log(`古人信息去重后剩余${Object.keys(personMap).length}条`);

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
  let dbPerson_进士: Record<string, Person_进士> = {};
  for (let record成为进士 of record成为进士List) {
    let record年号 = record年号Map[record成为进士.c_nianhao_id];
    let person = personMap[record成为进士.c_personid];
    // if (record年号 === undefined) {
    //   continue;
    // }
    if (person === undefined) {
      continue;
    }

    const aliasInfo = personAliasNameMap[record成为进士.c_personid];

    let item: Person_进士 = {
      c_personid: person.c_personid,
      // 姓名
      c_name_chn: person.c_name_chn,
      // 姓名-简体
      c_name_chn_simple: t2s4Name(person.c_name_chn),
      c_alt_name_字: aliasInfo?.c_alt_name_字 ?? "",
      c_alt_name_别号: aliasInfo?.c_alt_name_别号 ?? "",
      c_alt_name_别名_曾用名: aliasInfo?.c_alt_name_别名_曾用名 ?? "",
      c_alt_name_字_简体: aliasInfo?.c_alt_name_字_简体 ?? "",
      c_alt_name_别号_简体: aliasInfo?.c_alt_name_别号_简体 ?? "",
      c_alt_name_别名_曾用名_简体: aliasInfo?.c_alt_name_别名_曾用名_简体 ?? "",
      c_alt_name_谥号: aliasInfo?.c_alt_name_谥号 ?? "",
      c_alt_name_谥号_简体: aliasInfo?.c_alt_name_谥号_简体 ?? "",
      // 朝代
      c_dynasty_chn: record年号?.c_dynasty_chn ?? "",
      // 考取年份
      c_year: record成为进士.c_year,
      /**
       * 登科年号
       */
      c_nianhao_chn: record年号?.c_nianhao_chn ?? "",
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
    // 同一人会有多条登科记录
    if (dbPerson_进士[item.c_personid] !== undefined) {
      let oldRecord = dbPerson_进士[item.c_personid];
      console.log("发现重复信息, 原登科记录 => ", oldRecord);
      console.log("新登科记录 => ", item);
      // 比较原则
      // 1. 若旧登科年号为 '未詳', 取新值
      // 2. 若新记录登科年号为 '未詳' 或 没有c_year记录  或 没有c_age记录, 保留旧值
      // 2.1 若旧c_year为空, 取新值
      // 2.2 若旧age为空, 取新值
      // 2.3 其他情况-保留原值
      if (oldRecord.c_dynasty_chn === "未詳") {
        dbPerson_进士[item.c_personid] = item;
        continue;
      }
      if (
        item.c_dynasty_chn === "未詳" ||
        item.c_year > 0 === false ||
        item.c_age === ""
      ) {
        continue;
      }
      if (oldRecord.c_year > 0 === false) {
        dbPerson_进士[item.c_personid] = item;
      } else if (oldRecord.c_age === "") {
        dbPerson_进士[item.c_personid] = item;
      }
    } else {
      dbPerson_进士[item.c_personid] = item;
    }
  }
  recordList = [...Object.values(dbPerson_进士)];

  recordList.sort((a, b) => {
    return b.c_year - a.c_year;
  });

  let csvRecordList: string[] = [
    `朝代,姓名,姓名-简体,登科年份,登科年号,登科年号年份,登科年龄,科考成绩,字,字-简体,别号,别号-简体,别名_曾用名,别名_曾用名-简体,谥号,谥号-简体`,
  ];

  for (let item of recordList) {
    // `朝代,姓名,姓名-简体,登科年份,登科年号,登科年号年份,登科年龄,科考成绩,字,字-简体,别号,别号-简体,别名_曾用名,别名_曾用名-简体,谥号,谥号-简体`,
    csvRecordList.push(
      `${item.c_dynasty_chn},${item.c_name_chn},${item.c_name_chn_simple},${item.c_year},${item.c_nianhao_chn},${item.c_entry_nh_year},${item.c_age},${item.c_exam_rank},${item.c_alt_name_字},${item.c_alt_name_字_简体},${item.c_alt_name_别号},${item.c_alt_name_别号_简体},${item.c_alt_name_别名_曾用名},${item.c_alt_name_别名_曾用名_简体},${item.c_alt_name_谥号},${item.c_alt_name_谥号_简体}`
    );
  }

  fs.writeFileSync(
    Const.Raw_古代进士名录_JSON_Uri,
    JSON.stringify(recordList, null, 2)
  );
  fs.writeFileSync(Const.Raw_古代进士名录_CSV_Uri, csvRecordList.join("\n"));
  console.log("数据写入完毕");

  return;
}

asyncRunner();
