import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { 总字库 } from "@/const/char_db";
import {
  Const_Level_0_Pinyin,
  Const_Level_1_Pinyin,
  Const_Level_2_Pinyin,
} from "./const/pinyin_移除不好的字";

import { Button, Menu, ICascaderItem } from "zent";
import * as utils from "@/utils";
import * as Types from "@/types/index";
import NameList from "@/component/name_list";

// 引入样式
import "zent/css/index.css";

const { MenuItem } = Menu;

const Const_Storage_Key = "name_storage";
const Const_Storage_姓氏_Key = `${Const_Storage_Key}_family_name`;
const Const_Storage_人名_第一个字_Key = `${Const_Storage_Key}_Name_Char_1`;
const Const_Storage_人名_第二个字_Key = `${Const_Storage_Key}_Name_Char_2`;
const Const_Storage_Char_Leve_Key = `${Const_Storage_Key}_Char_Level`;

const Const_Pinyin_Menu_Option_Level_无音调拼音 = "pinyin" as const;
const Const_Pinyin_Menu_Option_Level_带音调拼音 = "带音调拼音" as const;
const Const_Pinyin_Menu_Option_Level_可选字 = "可选字" as const;

type Type_Pinyin_Menu_Option_Level =
  | typeof Const_Pinyin_Menu_Option_Level_无音调拼音
  | typeof Const_Pinyin_Menu_Option_Level_带音调拼音
  | typeof Const_Pinyin_Menu_Option_Level_可选字;

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

type Type_Cascader_Option = {
  value: "330000";
  label: "Level1";
  loadChildrenOnExpand: true;
};

function getCascaderOptionList(
  level: Type_Pinyin_Menu_Option_Level,
  currentValue = ""
) {
  let optionList: ICascaderItem[] = [];
  if (level === Const_Pinyin_Menu_Option_Level_无音调拼音) {
    for (let pinyin of Object.keys(Pinyin_Database_Map)) {
      let pinyinItem = Pinyin_Database_Map[pinyin];

      let first_option = pinyinItem.option_list[0];
      let option: ICascaderItem = {
        children: [],
        label: `${pinyinItem.pinyin_without_tone}-${first_option.char}`,
        value: JSON.stringify({
          pinyin_without_tone: pinyinItem.pinyin_without_tone,
        }),
        loadChildrenOnExpand: true,
        loadChildrenOnScroll: false,
        parent: null,
      };
      optionList.push(option);
    }
  } else if (level === Const_Pinyin_Menu_Option_Level_带音调拼音) {
    let { pinyin_without_tone } = JSON.parse(currentValue);
    let pinyin_option_list =
      Pinyin_Database_Map[pinyin_without_tone].option_list;
    let counter = 0;
    for (let pinyinItem of pinyin_option_list) {
      let option: ICascaderItem = {
        children: [],
        label: `${pinyinItem.pinyin_without_tone}-${pinyinItem.char}`,
        value: JSON.stringify({
          pinyin_without_tone: pinyinItem.pinyin_without_tone,
          option_list_index: counter,
        }),
        loadChildrenOnExpand: true,
        loadChildrenOnScroll: false,
        parent: null,
      };
      optionList.push(option);
      counter++;
    }
  } else if (level === Const_Pinyin_Menu_Option_Level_可选字) {
    let { pinyin_without_tone, option_list_index } = JSON.parse(currentValue);
    let choosePinyin =
      Pinyin_Database_Map[pinyin_without_tone].option_list[option_list_index];
    let char_list =
      Pinyin_Database_Map[pinyin_without_tone].option_list[option_list_index]
        .char_list;
    let counter = 0;
    for (let char of char_list) {
      let option: ICascaderItem = {
        children: [],
        label: `${choosePinyin.pinyin_without_tone}-${char}`,
        value: JSON.stringify({
          pinyin_without_tone: choosePinyin.pinyin_without_tone,
          option_list_index: option_list_index,
          char_list_index: counter,
          char,
        }),
        loadChildrenOnExpand: false,
        loadChildrenOnScroll: false,
        parent: null,
      };
      optionList.push(option);
      counter++;
    }
  }
  return optionList;
}

let default_input_姓氏_str = localStorage.getItem(Const_Storage_姓氏_Key);
let default_select_人名_第一个字_str = localStorage.getItem(
  Const_Storage_人名_第一个字_Key
);
let default_select_人名_第二个字_str =
  localStorage.getItem(Const_Storage_人名_第二个字_Key) || "";

let default_input_姓氏 = "";
let default_select_人名_第一个字 = TotalCharOptionList[0];
let default_select_人名_第二个字 = TotalCharOptionList[0];
try {
  if (default_input_姓氏_str !== null) {
    default_input_姓氏 = JSON.parse(default_input_姓氏_str);
  }
} catch (e) {}
try {
  if (default_select_人名_第一个字_str !== null) {
    default_select_人名_第一个字 = JSON.parse(default_select_人名_第一个字_str);
  }
} catch (e) {}
try {
  if (default_select_人名_第一个字_str !== null) {
    default_select_人名_第二个字 = JSON.parse(default_select_人名_第二个字_str);
  }
} catch (e) {}

const store = proxy<{
  nameList: Types.Type_Name[];
}>({
  nameList: [],
});

export default () => {
  let [input_姓氏, set_input_姓氏] = useState(default_input_姓氏);

  let storeSnapshot = useSnapshot(store);

  let [select_char_人名_第一个字, set_select_char_人名_第一个字] = useState(
    default_select_人名_第一个字
  );
  let [select_char_人名_第二个字, set_select_char_人名_第二个字] = useState(
    default_select_人名_第二个字
  );

  let ca_option_list = getCascaderOptionList(
    Const_Pinyin_Menu_Option_Level_无音调拼音
  );
  let [optionList, setOptionList] = useState(ca_option_list);

  let updateChoose = (newChoose: any, char_index: number) => {
    switch (char_index) {
      case 1:
        set_select_char_人名_第一个字(newChoose);
        localStorage.setItem(
          Const_Storage_人名_第一个字_Key,
          JSON.stringify(newChoose)
        );
        break;
      case 2:
        set_select_char_人名_第二个字(newChoose);
        localStorage.setItem(
          Const_Storage_人名_第二个字_Key,
          JSON.stringify(newChoose)
        );
        break;
    }
  };

  // 获取姓氏最后一个字
  let char_姓氏_最后一个字 = 总字库[input_姓氏?.[input_姓氏.length - 1] || ""];

  let char1 = select_char_人名_第一个字.char_item.char;
  let char2 = select_char_人名_第二个字.char_item.char;

  let char_1_OptionList = TotalCharOptionList.filter((item) => {
    let isLegal = utils.isCharLegal(char_姓氏_最后一个字, item.char_item);
    return isLegal;
  });
  let char_2_OptionList = TotalCharOptionList.filter((item) => {
    let isLegal = utils.isCharLegal(
      select_char_人名_第一个字.char_item,
      item.char_item
    );
    return isLegal;
  });

  let char_1_menuItemList = [];
  let char_2_menuItemList = [];
  let index = 0;
  for (let item of char_1_OptionList) {
    index++;
    let ele = <MenuItem key={`${index}`}>{item.text}</MenuItem>;
    char_1_menuItemList.push(ele);
  }

  for (let item of char_2_OptionList) {
    index++;

    let ele = (
      <MenuItem
        key={`${index}`}
        // key={item.key}
      >
        {item.text}
      </MenuItem>
    );
    char_2_menuItemList.push(ele);
  }

  let randomGenerateName = (char_姓氏: string) => {
    let char_姓氏_最后一个字 = 总字库[char_姓氏?.[char_姓氏.length - 1] || ""];

    let new_char_1_optionList = TotalCharOptionList.filter((item) => {
      let isLegal = utils.isCharLegal(char_姓氏_最后一个字, item.char_item);
      return isLegal;
    });

    let random1 =
      parseInt(`${Math.random() * 100000000}`) % new_char_1_optionList.length;
    let randomChar1 = new_char_1_optionList[random1];

    let new_char_2_optionList = TotalCharOptionList.filter((item) => {
      let isLegal = utils.isCharLegal(randomChar1.char_item, item.char_item);
      return isLegal;
    });

    let random2 =
      parseInt(`${Math.random() * 100000000}`) % new_char_2_optionList.length;

    let randomChar2 = new_char_2_optionList[random2];

    let name: Types.Type_Name = {
      姓氏: input_姓氏,
      人名_第一个字: randomChar1,
      人名_第二个字: randomChar2,
    };
    return name;
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
      <Button
        onClick={function () {
          let randomNameList: Types.Type_Name[] = [];
          for (let i = 0; i < 100; i++) {
            let randomName = randomGenerateName(input_姓氏);
            randomNameList.push(randomName);
          }
          store.nameList = randomNameList;
          // console.log("main nameList => ", []);
        }}
      >
        随机生成100个名字
      </Button>
      <NameList nameList={storeSnapshot.nameList}></NameList>
      {/* <MenuCascader
        options={optionList}
        loadOptions={async (selectedOptions, meta) => {
          if (selectedOptions === null) {
            return;
          }
          let level: Type_Pinyin_Menu_Option_Level =
            Const_Pinyin_Menu_Option_Level_无音调拼音;
          switch (selectedOptions.length) {
            case 0:
              level = Const_Pinyin_Menu_Option_Level_无音调拼音;
              break;
            case 1:
              level = Const_Pinyin_Menu_Option_Level_带音调拼音;
              break;
            case 2:
              level = Const_Pinyin_Menu_Option_Level_可选字;
              break;
          }

          let value = selectedOptions[selectedOptions.length - 1].value;
          let nextOptionList = getCascaderOptionList(level, value);

          let newOptionList = clone(optionList);
          const node = getNode(newOptionList, selectedOptions);
          node.children = nextOptionList;
          // mark as loaded
          node.loadChildrenOnExpand = false;

          setOptionList([...newOptionList]);
          return;
        }}
      ></MenuCascader> */}
    </div>
  );
};
