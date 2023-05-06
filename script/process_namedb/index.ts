import * as path from "path";
import * as fs from "fs";
import * as Const from "./const";
import * as Type from "./type";

/**
 * 返回合法人名用字
 * @param personName
 * @returns
 */
function parseLegalName(personName: string) {
  const charList = personName.trim().split("");
  switch (charList.length) {
    case 0:
    case 1:
      return [];
    case 2: {
      // 只取最后一位
      return charList.slice(1);
    }
    case 3:
    case 4: {
      // 只取最后两位
      return charList.slice(charList.length - 2);
    }
    default:
      return [];
  }
}

async function asyncRunner() {
  console.log("开始生成取名可选字");
  let totalUserNameCount = 0;

  const charDB: Type.CharDB = {};

  // 获取人名库列表
  const rawFileNameList = fs.readdirSync(Const.Raw_已知人名_Path);
  // 只读取txt文件
  const fileNameList = rawFileNameList.filter((item) => item.endsWith(".txt"));

  for (let filename of fileNameList) {
    const rawContent = fs
      .readFileSync(path.resolve(Const.Raw_已知人名_Path, filename))
      .toString();
    const personNameList = rawContent.split("\n");
    for (const personName of personNameList) {
      const legalCharList = parseLegalName(personName);
      if (legalCharList.length === 0) {
        continue;
      }
      totalUserNameCount++;
      for (const char of legalCharList) {
        // 更新数据库
        if (charDB[char] === undefined) {
          charDB[char] = {
            char,
            count: 1,
          };
        } else {
          charDB[char].count = charDB[char].count + 1;
        }
      }
    }
  }

  const value = Object.values(charDB);
  value.sort((a, b) => {
    return b.count - a.count;
  });

  fs.writeFileSync(Const.CharDb_Uri, JSON.stringify(value, null, 4));
  console.log(
    `执行完毕, 共解析人名${totalUserNameCount}个, 汇总到${value.length}个可用于起名的字符`
  );
}

asyncRunner();
