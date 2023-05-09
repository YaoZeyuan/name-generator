import * as fs from "fs";
import * as Type from "@/script/common/type";
import * as Const from "@/script/common/const";
import * as util from "@/script/common/util";
import * as OldPersonNameDb from "@/resource/old_person_name/中国古代人名与字-9336条-简体-opencc转换稿_手工替换_乾干.json";

async function asyncRunner() {
  console.log("开始转换人名数据库");

  let nameList: Type.Type_Name[] = [];
  let rawNameList: string[] = [];
  // 先汇总所有选项
  for (let oldPersonNameItem of OldPersonNameDb) {
    rawNameList.push(util.trans2LegalString(oldPersonNameItem.char_名));
    rawNameList.push(util.trans2LegalString(oldPersonNameItem.char_字));
  }
  // 只保留2位名字
  rawNameList = rawNameList.filter((item) => {
    return item.length === 2;
  });
  let bufNameList = rawNameList.map((item) => util.transName2Record(item));
  for (let buf of bufNameList) {
    if (buf !== false) {
      nameList.push(buf);
    }
  }

  let realNameList = nameList.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });

  fs.writeFileSync(
    Const.Name_Db_古人云_历史人名_Uri,
    JSON.stringify(realNameList, null, 2)
  );

  console.log("人名数据库处理完毕");
}

asyncRunner();
