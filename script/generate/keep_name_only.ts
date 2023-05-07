/**
 * 汇总统计人名
 */
import * as path from "path";
import * as fs from "fs";
import * as Const from "../common/const";
import * as Type from "../common/type";
const Input_Uri =
  "/home/yao/www/share/name_generator/resource/person_name/1.txt";
const Output_Uri =
  "/home/yao/www/share/name_generator/resource/person_name/已知人名.json";

// 跳过复姓
const set_复姓 = new Set([
  "万俟",
  "司马",
  "上官",
  "欧阳",
  "夏侯",
  "诸葛",
  "闻人",
  "东方",
  "赫连",
  "皇甫",
  "尉迟",
  "公羊",
  "澹台",
  "公冶",
  "宗政",
  "濮阳",
  "淳于",
  "单于",
  "太叔",
  "申屠",
  "公孙",
  "仲孙",
  "轩辕",
  "令狐",
  "锺离",
  "宇文",
  "长孙",
  "慕容",
  "鲜于",
  "闾丘",
  "司徒",
  "司空",
  "亓官",
  "司寇",
  "子车",
  "颛孙",
  "端木",
  "巫马",
  "公西",
  "漆雕",
  "乐正",
  "壤驷",
  "公良",
  "拓跋",
  "夹谷",
  "宰父",
  "穀梁",
  "段干",
  "百里",
  "东郭",
  "南门",
  "呼延",
  "羊舌",
  "微生",
  "梁丘",
  "左丘",
  "东门",
  "西门",
  "南宫",
  "第五",
]);

async function asyncRunner() {
  console.log("开始生成取名可选字");

  // 获取人名库列表
  const usernameList = fs.readFileSync(Input_Uri).toString().split("\n");
  let nameMap: Record<
    string,
    {
      name: string;
      counter: number;
      length: number;
    }
  > = {};
  // 只读取txt文件
  let nameCounter = 0;
  for (let username of usernameList) {
    if (username.length !== 2 && username.length !== 3) {
      // 只取2字和3字名
      continue;
    }
    let str_2 = username.slice(0, 2);
    if (set_复姓.has(str_2)) {
      console.log("检测到复姓 =>", username, "自动跳过");
      continue;
    }
    let name = username.slice(1);
    nameCounter++;
    if (nameMap[name] === undefined) {
      nameMap[name] = {
        name,
        counter: 1,
        length: name.length,
      };
    } else {
      nameMap[name].counter++;
    }
  }

  fs.writeFileSync(Output_Uri, JSON.stringify(nameMap, null, 2));
  console.log(
    `执行完毕, 共解析人名${nameCounter}个, 去重后剩余${
      Object.keys(nameMap).length
    }个`
  );
}

asyncRunner();
