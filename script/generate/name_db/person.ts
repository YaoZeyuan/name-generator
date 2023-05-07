import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "./util";
import * as RawNameDb from "../../../resource/person_name/已知人名.json";

async function asyncRunner() {
  console.log("开始转换人名数据库");

  let nameList: Type.Type_Name[] = [];
  for (let name of Object.keys(RawNameDb)) {
    name = util.trans2LegalString(name);
    if (name.length !== 2) {
      // 不考虑非双字名
      continue;
    }
    let legalName = util.transName2Record(name);
    if (legalName !== false) {
      nameList.push(legalName);
    }
  }

  let realNameList = nameList.map((item) => {
    return item.人名_第一个字.char + item.人名_第二个字.char;
  });

  fs.writeFileSync(
    Const.Name_Db_看答案_已知人名_Uri,
    JSON.stringify(realNameList, null, 2)
  );

  console.log("人名数据库处理完毕");
}

asyncRunner();
