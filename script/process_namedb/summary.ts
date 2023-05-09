import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";

const totalNameRecord = 161733;
const totalCharUse = 3294;

async function asyncRunner() {
  const content = fs.readFileSync(Const.CharDb_人名列表_Uri).toString();
  const itemList: Type.Char[] = JSON.parse(content);
  // 输出统计数据
  const perList = [99, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 1];

  let counter = 0;
  const total = itemList.length;

  console.log(
    `对${totalNameRecord}个人名用字的统计结果显示, 共出现了${totalCharUse}个人名用字, 其中\n`
  );
  for (let per of perList) {
    const pos = Math.floor(((100 - per) * total) / 100);
    if (itemList[pos]?.count > 5) {
      console.log(
        `${100 - per}%的字被使用了${
          itemList[pos]?.count
        }次以上, 这种字共${pos}个`
      );
    }
  }
  console.log("");
  const charCountList = [10, 5, 4, 3, 2, 1];
  for (let chatCount of charCountList) {
    let pos = 0;
    for (let item of itemList) {
      pos++;
      if (item.count <= chatCount) {
        break;
      }
    }

    console.log(
      `被使用数大于${chatCount}次的字共${pos}个, 占比${Math.floor(
        (pos / total) * 100
      )}%`
    );
  }
}

asyncRunner();
