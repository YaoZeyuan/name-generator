import React, { useEffect, useState } from "react";
import { Const_Pinyin_To_Char, Pinyin_List } from "./const/字库";
import { Select } from "zent";

// 引入样式
import "zent/css/index.css";

let optionList = [];
for (let item of Pinyin_List) {
  let option = {
    key: item.pinyin,
    text: `${item.pinyin}-${item.char}`,
  };
  optionList.push(option);
}

const Const_Total_Choose = Pinyin_List.length;

const Const_Storage_Key_1 = "name_storage_1";
const Const_Storage_Key_2 = "name_storage_2";

let defaultSelectChar_1_str = localStorage.getItem(Const_Storage_Key_1);
let defaultSelectChar_2_str = localStorage.getItem(Const_Storage_Key_2);

let defaultSelectChar_1 = optionList[0];
let defaultSelectChar_2 = optionList[0];
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
  let [show, setShow] = useState(true);
  let [selectChar_1, setSelectChar_1] = useState(defaultSelectChar_1);
  let [selectChar_2, setSelectChar_2] = useState(defaultSelectChar_2);

  let updateChoose = (newChoose: any, char_index) => {
    switch (char_index) {
      case 1:
        setSelectChar_1(newChoose);
        localStorage.setItem(Const_Storage_Key_1, JSON.stringify(newChoose));
        break;
      case 2:
        setSelectChar_2(newChoose);
        localStorage.setItem(Const_Storage_Key_2, JSON.stringify(newChoose));
        break;
    }
  };

  let char1 = Const_Pinyin_To_Char[selectChar_1.key].char;
  let char2 = Const_Pinyin_To_Char[selectChar_2.key].char;

  return (
    <div>
      <button
        onClick={() => {
          let random1 =
            parseInt(`${Math.random() * 100000000}`) % Const_Total_Choose;
          let random2 =
            parseInt(`${Math.random() * 100000000}`) % Const_Total_Choose;
          updateChoose(optionList[random1], 1);
          updateChoose(optionList[random2], 2);
        }}
      >
        随机取名
      </button>
      <p></p>
      <p>姓名:姚{`${char1}${char2}`}</p>
      <Select
        onChange={(selectChar_1) => {
          updateChoose(selectChar_1, 1);
        }}
        options={optionList}
        value={selectChar_1}
      ></Select>
      <Select
        onChange={(selectChar_2) => {
          updateChoose(selectChar_2, 2);
        }}
        options={optionList}
        value={selectChar_2}
      ></Select>
    </div>
  );
};
