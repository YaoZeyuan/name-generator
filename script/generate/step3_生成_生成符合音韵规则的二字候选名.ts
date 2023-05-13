import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import * as util from "@/script/common/util";
import async古人云 from "./wait_2_choose_name/古人名字";
import async基金相关 from "./wait_2_choose_name/基金相关";
import async现代人名 from "./wait_2_choose_name/现代人名";
import async进士人名 from "./wait_2_choose_name/进士人名";
import async科学家 from "./wait_2_choose_name/科学家";

/**
 * 生成符合音韵规则的二字候选名
 */
async function asyncRunner() {
  console.log("开始生成二字候选名");
  await async现代人名();
  await async基金相关();
  await async古人云();
  await async进士人名();
  await async科学家();
  // 额外统计下多音字来源以及出现场景, 方便更新拼音库
  let summaryList = util.private_getSummaryDb_仅在生成二字候选名时使用();
  let summaryTextList = summaryList.map((item) => {
    let newNameList = item.nameList.map((item) => {
      return `${item.name}:${item.count}`;
    });
    return (
      `# ${item.char}:${item.totalCount}` +
      `\n${newNameList.join("\n")}` +
      `\n----------------`
    );
  });
  let charList = summaryList.map((item) => {
    return item.char;
  });
  fs.writeFileSync(
    Const.Char_Db_生成二字候选名时统计发现的多音字及出现场景_JSON_Uri,
    JSON.stringify(summaryList, null, 2)
  );
  fs.writeFileSync(
    Const.Char_Db_生成二字候选名时统计发现的多音字及出现场景_Markdown_Uri,
    summaryTextList.join("\n")
  );
  fs.writeFileSync(
    Const.Char_Db_生成二字候选名时统计发现的多音字及出现场景_仅字符_Uri,
    charList.join("\n")
  );
  console.log("所有二字候选名生成完毕");
}

asyncRunner();
