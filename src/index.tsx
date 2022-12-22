import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { useDebounceFn } from "ahooks";
import { 总字库 } from "@/const/char_db";
import {
  Const_Level_0_Pinyin,
  Const_Level_1_Pinyin,
  Const_Level_2_Pinyin,
} from "./const/pinyin_移除不好的字";

import { Button, Input } from "antd";
import * as utils from "@/utils";
import * as Types from "@/types/index";
import NameList from "@/component/name_list";
import { saveAs } from "file-saver";

const Const_Storage_Key = "name_storage";
const Const_Storage_姓氏_Key = `${Const_Storage_Key}_family_name`;
const Const_Storage_需过滤字列表_Key = `${Const_Storage_Key}_Need_Fileter_Char`;
const Const_Storage_Char_Leve_Key = `${Const_Storage_Key}_Char_Level`;

// 所有可选字列表
let TotalCharOptionList: Types.Type_Char_Option[] = [];

const char_level =
  (parseInt(localStorage.getItem(Const_Storage_Char_Leve_Key) || "0") as
    | 0
    | 1
    | 2) || 0;
// 根据汉字级别, 设定所使用的选项集
let Pinyin_Database_Map: typeof Const_Level_0_Pinyin;

switch (char_level) {
  case 0:
    Pinyin_Database_Map = Const_Level_0_Pinyin;
    break;
  case 1:
    Pinyin_Database_Map = Const_Level_1_Pinyin;
    break;
  case 2:
  default:
    Pinyin_Database_Map = Const_Level_2_Pinyin;
    break;
}

for (let pinyin of Object.keys(Pinyin_Database_Map)) {
  let pinyin_option_list = Pinyin_Database_Map[pinyin].option_list;
  for (let item of pinyin_option_list) {
    let option: Types.Type_Char_Option = {
      key: `${item.pinyin}-${item.char}`,
      text: `${item.pinyin}-${item.char}`,
      char_item: item,
    };
    TotalCharOptionList.push(option);
  }
}

let default_input_姓氏_str = localStorage.getItem(Const_Storage_姓氏_Key);
let default_input_需过滤字列表_str = localStorage.getItem(
  Const_Storage_需过滤字列表_Key
);

let default_input_姓氏 = "";
try {
  if (default_input_姓氏_str !== null) {
    default_input_姓氏 = JSON.parse(default_input_姓氏_str);
  }
} catch (e) {}
let default_input_需过滤字列表 = "";
try {
  if (default_input_需过滤字列表_str !== null) {
    default_input_需过滤字列表 = JSON.parse(default_input_需过滤字列表_str);
  }
} catch (e) {}

const store = proxy<{
  nameList: Types.Type_Name[];
  totalNameCount: number;
  maxDisplayItem: number;
  columnCount: number;
}>({
  /**
   * 生成的姓名列表
   */
  nameList: [],
  /**
   * 总姓名数量
   */
  totalNameCount: 0,
  /**
   * 最大展示的姓名数
   */
  maxDisplayItem: 10000,
  /**
   * 每行展示x列
   */
  columnCount: 10,
});

export default () => {
  let [input_姓氏, set_input_姓氏] = useState(default_input_姓氏);
  let [input_需过滤字列表, set_input_需过滤字列表] =
    useState(default_input_需过滤字列表);

  let storeSnapshot = useSnapshot(store);

  let generateAllNameList = (char_姓氏: string) => {
    let nameList: Types.Type_Name[] = [];
    let char_姓氏_最后一个字 = 总字库[char_姓氏?.[char_姓氏.length - 1] || ""];

    let needFileterCharList = input_需过滤字列表.split("");
    // 使用set, 方便过滤掉重复的拼音
    let needFileterPinyinSet = new Set();
    for (let needFileterChar of needFileterCharList) {
      let pinyin = 总字库[needFileterChar]?.pinyin;
      if (pinyin) {
        needFileterPinyinSet.add(pinyin);
      }
    }

    // 过滤掉所有同音字
    let newTotalCharOptionList = TotalCharOptionList.filter((item) => {
      return needFileterPinyinSet.has(item.char_item.pinyin) === false;
    });

    let new_char_1_optionList = newTotalCharOptionList.filter((item) => {
      let isLegal = utils.isCharLegal(char_姓氏_最后一个字, item.char_item);
      return isLegal;
    });

    for (let char1 of new_char_1_optionList) {
      let new_char_2_optionList = newTotalCharOptionList.filter((item) => {
        let isLegal = utils.isCharLegal(char1.char_item, item.char_item);
        return isLegal;
      });
      for (let char2 of new_char_2_optionList) {
        let name: Types.Type_Name = {
          姓氏: input_姓氏,
          人名_第一个字: char1,
          人名_第二个字: char2,
        };
        nameList.push(name);
      }
    }
    return nameList;
  };

  return (
    <div>
      <div>
        <span>请输入姓氏</span>
        <input
          value={input_姓氏}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            localStorage.setItem(
              Const_Storage_姓氏_Key,
              JSON.stringify(inputValue)
            );
            set_input_姓氏(inputValue);
          }}
        ></input>
      </div>
      <div>
        需要避开的同音字(例如父母姓名/亲属姓名)
        <Input.TextArea
          value={input_需过滤字列表}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            localStorage.setItem(
              Const_Storage_需过滤字列表_Key,
              JSON.stringify(inputValue)
            );
            set_input_需过滤字列表(inputValue);
          }}
        ></Input.TextArea>
      </div>
      <div>
        <Button
          onClick={function () {
            let nameList = generateAllNameList(input_姓氏);
            store.totalNameCount = nameList.length;
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            store.nameList = nameList;
          }}
        >
          点击生成所有可能的名字发音
        </Button>
        <Button
          disabled={storeSnapshot.nameList.length === 0}
          type="primary"
          onClick={() => {
            let nameList = storeSnapshot.nameList;
            let columns = [];
            for (let i = 0; i < nameList.length; i++) {
              let item = nameList[i];
              columns.push(
                `${i + 1}-${item.姓氏}${item.人名_第一个字.char_item.char}${
                  item.人名_第二个字.char_item.char
                }`
              );
            }

            let str = "姓名,\n" + columns.join(",\n");

            let blob = new Blob([str], {
              type: "text/plain;charset=utf-8",
            });
            saveAs(blob, "所有可能的姓名发音列表.csv");
          }}
        >
          点击下载
        </Button>
      </div>

      <p>
        姓氏:{input_姓氏} 共可能有{storeSnapshot.totalNameCount}个可能的三字名,
        展示前{storeSnapshot.maxDisplayItem}个, 每行展示
        {storeSnapshot.columnCount}个
      </p>
      <NameList
        nameList={storeSnapshot.nameList.slice(0, storeSnapshot.maxDisplayItem)}
        columnCount={storeSnapshot.columnCount}
      ></NameList>
    </div>
  );
};
