import * as fs from "fs";
import * as Type from "../../common/type";
import * as Const from "../../common/const";
import * as util from "@/script/common/util";

export default async function asyncRunner() {
  console.log("开始根据科学家姓名生成候选名");

  const content = fs
    .readFileSync(
      "/home/yao/www/share/name_generator/resource/science/汇总.txt"
    )
    .toString();
  let lineList = content.split("\n");
  let nameList: Type.Type_Name[] = [];

  for (let line of lineList) {
    line = util.trans2LegalString(line);
    let name = line.slice(1);
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
  // 去重并排序
  realNameList = [...new Set(realNameList).values()];
  realNameList.sort();

  fs.writeFileSync(
    Const.Name_Db_Uri.五道口精华版_国家科研基金项目负责人名,
    JSON.stringify(realNameList, null, 2)
  );

  console.log(
    `根据科学家姓名生成候选名完毕, 共生成${realNameList.length}个候选名`
  );
}
