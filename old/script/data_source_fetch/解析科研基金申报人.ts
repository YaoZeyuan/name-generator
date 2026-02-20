import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
import axios from "axios";

async function asyncSleep() {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove(true);
    }, 50);
  });
}

/**
 * 临时脚本: 解析科研基金
 */
async function asyncRunner() {
  console.log("开始抓取基金列表");
  return;
  // const inputUri = "cnki已立项项目.txt";
  // const outputUri = "cnki_申请人.json";

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
