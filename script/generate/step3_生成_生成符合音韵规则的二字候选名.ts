import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import async古人云 from "./wait_2_choose_name/古人名字";
import async基金相关 from "./wait_2_choose_name/基金相关";
import async现代人名 from "./wait_2_choose_name/现代人名";

/**
 * 生成符合音韵规则的二字候选名
 */
async function asyncRunner() {
  console.log("开始生成二字候选名");
  await async古人云();
  await async基金相关();
  await async现代人名();
  console.log("所有二字候选名生成完毕");
}

asyncRunner();
