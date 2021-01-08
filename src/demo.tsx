import React, { useEffect, useState } from "react";
import { char_db, 音标_list } from "./const/char_db";
// import { pinyin2char } from "./const/char";
import { Picker } from "react-weui";
//import styles
import "weui";
import "react-weui/build/packages/react-weui.css";

let charList = {
  items: [],
};
for (let 音标 of 音标_list) {
  charList.items.push({
    label: `${音标} ${char_db[音标]}`,
    char: `${char_db[音标]}`,
    pinyin: `${音标}`,
  });
}
const Const_Total_Choose = charList.items.length;

const Const_Storage_Key = "name_storage";

let defaultSelectStr = localStorage.getItem(Const_Storage_Key) || "[0,0]";
let defaultSelectList = JSON.parse(defaultSelectStr);

export default () => {
  let [show, setShow] = useState(true);
  let [chooseList, setChooseList] = useState(defaultSelectList);

  let firstChar = char_db[音标_list[chooseList[0]]];
  let secondChar = char_db[音标_list[chooseList[1]]];

  let updateChoose = (newChooseList: [number, number]) => {
    console.log("chooseList =>", newChooseList);
    setChooseList(newChooseList);
    localStorage.setItem(Const_Storage_Key, JSON.stringify(newChooseList));
  };

  return (
    <div>
      <pre>{/* {JSON.stringify(pinyin2char)} */}</pre>
      <button
        onClick={() => {
          let random1 =
            parseInt(Math.random() * 100000000) % Const_Total_Choose;
          let random2 =
            parseInt(Math.random() * 100000000) % Const_Total_Choose;
          updateChoose([random1, random2]);
        }}
      >
        随机取名
      </button>
      <p></p>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        Picker状态:{`${show ? "开" : "关"}`}
      </button>
      <p>姓名:姚{`${firstChar}${secondChar}`}</p>
      <Picker
        defaultSelect={chooseList}
        show={show}
        onCancel={() => {
          setShow(false);
        }}
        onChange={(selected) => {
          setShow(false);
          updateChoose(selected);
        }}
        groups={[charList, charList]}
      ></Picker>
    </div>
  );
};
