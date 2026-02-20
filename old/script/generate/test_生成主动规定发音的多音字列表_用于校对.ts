import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import * as util from "@/script/common/util";
import * as CharDb_主动规定发音的多音字列表 from "@/database/char_db/主动规定发音的多音字列表.json";

/**
 * 生成符合音韵规则的二字候选名
 */
async function asyncRunner() {
  console.log("生成主动规定发音的多音字列表_用于校对");

  let mdContentList = [
    `| 字符 | 发音   | 反例                                        |`,
    `| :--- | :----- | :------------------------------------------ |`,
  ];
  for (let charConfig of CharDb_主动规定发音的多音字列表) {
    let content = `| ${charConfig.char}   | ${charConfig.pinyin}    |                                     |`;
    mdContentList.push(content);
  }
  fs.writeFileSync(
    path.resolve(Const.basePath, "test/多音字验证/多音字取音标准_测试.md"),
    mdContentList.join("\n")
  );

  console.log("主动规定发音的多音字列表生成完毕");
}

asyncRunner();
