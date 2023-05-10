import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "@/script/common/util";
import * as RawNameDb from "@/resource/person_name/已知人名.json";

export default async function asyncRunner() {
  console.log("开始根据现代人名生成候选名");

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
    Const.Name_Db_Uri.他山石_已知人名,
    JSON.stringify(realNameList, null, 2)
  );

  console.log(
    `根据现代人名生成候选名完毕, 共生成${realNameList.length}个候选名`
  );
}
