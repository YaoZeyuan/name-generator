import React, { useEffect, useState } from "react";
import {
  Const_Pinyin_To_Char,
  Pinyin_List,
  Type_Char_Item,
} from "./const/字库";
import { 总字库 } from "./const/char_db";
import { Select } from "zent";
import * as utils from "./utils";

// 引入样式
import "zent/css/index.css";

type Type_Char_Option = {
  key: string;
  text: string;
  char_item: Type_Char_Item;
};

// 所有可选字列表
let TotalCharOptionList: Type_Char_Option[] = [];
for (let item of Pinyin_List) {
  let option: Type_Char_Option = {
    key: item.pinyin,
    text: `${item.pinyin}-${item.char}`,
    char_item: item,
  };
  TotalCharOptionList.push(option);
}

const Const_Total_Choose = Pinyin_List.length;

const Const_Storage_Key = "name_storage";
const Const_Storage_Family_Name_Key = `${Const_Storage_Key}_family_name`;
const Const_Storage_Name_Char_1_Key = `${Const_Storage_Key}_Name_Char_1`;
const Const_Storage_Name_Char_2_Key = `${Const_Storage_Key}_Name_Char_2`;

let defaultInputFamilyName_str = localStorage.getItem(
  Const_Storage_Family_Name_Key
);
let defaultSelectChar_1_str = localStorage.getItem(
  Const_Storage_Name_Char_1_Key
);
let defaultSelectChar_2_str = localStorage.getItem(
  Const_Storage_Name_Char_2_Key
);

let defaultInputFamilyName = "";
let defaultSelectChar_1 = TotalCharOptionList[0];
let defaultSelectChar_2 = TotalCharOptionList[0];
try {
  if (defaultInputFamilyName_str !== null) {
    defaultInputFamilyName = JSON.parse(defaultInputFamilyName_str);
  }
} catch (e) {}
try {
  if (defaultSelectChar_1_str !== null) {
    defaultSelectChar_1 = JSON.parse(defaultSelectChar_1_str);
  }
} catch (e) {}
try {
  if (defaultSelectChar_1_str !== null) {
    defaultSelectChar_2 = JSON.parse(defaultSelectChar_2_str);
  }
} catch (e) {}

export default () => {
  let [inputFamilyName, setInputFamilyName] = useState(defaultInputFamilyName);
  let [selectChar_1, setSelectChar_1] = useState(defaultSelectChar_1);
  let [selectChar_2, setSelectChar_2] = useState(defaultSelectChar_2);

  let updateChoose = (newChoose: any, char_index) => {
    switch (char_index) {
      case 1:
        setSelectChar_1(newChoose);
        localStorage.setItem(
          Const_Storage_Name_Char_1_Key,
          JSON.stringify(newChoose)
        );
        break;
      case 2:
        setSelectChar_2(newChoose);
        localStorage.setItem(
          Const_Storage_Name_Char_2_Key,
          JSON.stringify(newChoose)
        );
        break;
    }
  };

  let familyNameItem = 总字库[inputFamilyName.split("").pop()];

  let char1 = selectChar_1.char_item.char;
  let char2 = selectChar_2.char_item.char;

  let char_1_OptionList = TotalCharOptionList.filter((item) => {
    let isLegal = utils.isCharLegal(familyNameItem, item.char_item);
    return isLegal;
  });
  let char_2_OptionList = TotalCharOptionList.filter((item) => {
    let isLegal = utils.isCharLegal(selectChar_1.char_item, item.char_item);
    return isLegal;
  });

  return (
    <div>
      <div>
        <span>请输入姓氏</span>
        <input
          value={inputFamilyName}
          onChange={(e) => {
            let inputValue = e.target.value;
            localStorage.setItem(
              Const_Storage_Family_Name_Key,
              JSON.stringify(inputValue)
            );
            setInputFamilyName(inputValue);
          }}
        ></input>
      </div>
      <button
        onClick={() => {
          let new_char_1_optionList = TotalCharOptionList.filter((item) => {
            let isLegal = utils.isCharLegal(familyNameItem, item.char_item);
            return isLegal;
          });

          let random1 =
            parseInt(`${Math.random() * 100000000}`) %
            new_char_1_optionList.length;
          let randomChar1 = new_char_1_optionList[random1];

          let new_char_2_optionList = TotalCharOptionList.filter((item) => {
            let isLegal = utils.isCharLegal(
              randomChar1.char_item,
              item.char_item
            );
            return isLegal;
          });

          let random2 =
            parseInt(`${Math.random() * 100000000}`) %
            new_char_2_optionList.length;

          let randomChar2 = new_char_2_optionList[random2];

          updateChoose(randomChar1, 1);
          updateChoose(randomChar2, 2);
        }}
      >
        随机取名
      </button>
      <p></p>
      <p>
        姓名:{inputFamilyName}
        {`${char1}${char2}`}
      </p>
      <Select
        onChange={(selectChar_1) => {
          updateChoose(selectChar_1, 1);
        }}
        options={char_1_OptionList}
        value={selectChar_1}
      ></Select>
      <Select
        onChange={(selectChar_2) => {
          updateChoose(selectChar_2, 2);
        }}
        options={char_2_OptionList}
        value={selectChar_2}
      ></Select>
    </div>
  );
};
