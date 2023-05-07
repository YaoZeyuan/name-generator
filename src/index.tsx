import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
// import PinyinDb_Min_1 from "@/../database/pinyin_db/zd_name_pinyin_db_min_1.json";
// import PinyinDb_Min_5 from "@/../database/pinyin_db/zd_name_pinyin_db_min_5.json";
import PinyinDb_Min_10 from "@/../database/pinyin_db/zd_name_pinyin_db_min_10.json";
import PinyinDb_Min_100 from "@/../database/pinyin_db/zd_name_pinyin_db_min_100.json";
import * as CommonType from "@/../script/common/type";

import { Button, Input } from "antd";
import * as utils from "@/utils";
import * as Type from "@/resource/type";
import * as Const from "@/resource/const";
import NameList from "@/component/name_list";
import { saveAs } from "file-saver";

const char_level = utils.getValueByStorage(Const.Storage_Char_Leve_Key, 0);

// 根据汉字级别, 设定所使用的选项集
let Pinyin_Database_Map: CommonType.Pinyin_Db =
  PinyinDb_Min_100 as CommonType.Pinyin_Db;

// switch (char_level) {
//   case 0:
//     Pinyin_Database_Map = PinyinDb_Min_1 as Type.Pinyin_Db;
//     break;
//   case 1:
//     Pinyin_Database_Map = PinyinDb_Min_5 as Type.Pinyin_Db;
//     break;
//   case 2:
//   default:
//     Pinyin_Database_Map = PinyinDb_Min_10 as Type.Pinyin_Db;
//     break;
// }

let default_input_姓氏 = utils.getValueByStorage(Const.Storage_姓氏_Key, "");
let default_input_排除字列表 = utils.getValueByStorage(
  Const.Storage_需过滤字列表_Key,
  ""
);
let default_input_必选字 = utils.getValueByStorage(
  Const.Storage_必选字_Key,
  ""
);

const store = proxy<{
  nameList: CommonType.Type_Name[];
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
  maxDisplayItem: 1000,
  /**
   * 每行展示x列
   */
  columnCount: 10,
});

export default () => {
  let [input_姓氏, set_input_姓氏] = useState<string>(default_input_姓氏);
  let [input_排除字列表, set_input_排除字列表] =
    useState<string>(default_input_排除字列表);
  let [input_必选字, set_input_必选字] = useState<string>(default_input_必选字);

  let storeSnapshot = useSnapshot(store);

  const char_姓_全部 = utils.transString2PinyinList(input_姓氏);
  const char_姓_末尾字 = utils.getPinyinOfChar(
    input_姓氏.split("").pop() ?? ""
  );
  const char_必选字_list = utils.transString2PinyinList(input_必选字);
  const char_排除字_list = utils.transString2PinyinList(input_排除字列表);

  return (
    <div>
      <div>
        <span>请输入姓氏</span>
        <input
          value={input_姓氏}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            utils.setValueByStorage(Const.Storage_姓氏_Key, inputValue);
            set_input_姓氏(inputValue);
          }}
        ></input>
      </div>
      <div>
        需要避开的同音字(例如父母姓名/亲属姓名)
        <Input.TextArea
          value={input_排除字列表}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            utils.setValueByStorage(Const.Storage_需过滤字列表_Key, inputValue);
            set_input_排除字列表(inputValue);
          }}
        ></Input.TextArea>
      </div>
      <div>
        指定出现的字(可不填)
        <Input.TextArea
          value={input_必选字}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            utils.setValueByStorage(Const.Storage_必选字_Key, inputValue);
            set_input_必选字(inputValue);
          }}
        ></Input.TextArea>
      </div>
      <div>
        <Button
          onClick={function () {
            let nameList = utils.generateLegalNameList({
              char_姓_全部,
              char_姓_末尾字: char_姓_末尾字[0],
              char_必选字_list,
              char_排除字_list,
              legal_PinyinDb: Pinyin_Database_Map,
            });
            store.totalNameCount = nameList.length;
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            store.nameList = nameList;
          }}
        >
          点击生成所有可能的名字发音
        </Button>
        <Button
          onClick={function () {
            let nameList = utils.generateLegalNameListFromExist({
              char_姓_全部,
              char_姓_末尾字: char_姓_末尾字[0],
              char_必选字_list,
              char_排除字_list,
              chooseType: Const.Choose_Type_看答案,
            });
            store.totalNameCount = nameList.length;
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            store.nameList = nameList;
          }}
        >
          看答案
        </Button>
        <Button
          onClick={function () {
            let nameList = utils.generateLegalNameListFromExist({
              char_姓_全部,
              char_姓_末尾字: char_姓_末尾字[0],
              char_必选字_list,
              char_排除字_list,
              chooseType: Const.Choose_Type_古人云,
            });
            store.totalNameCount = nameList.length;
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            store.nameList = nameList;
          }}
        >
          古人云
        </Button>
        <Button
          onClick={function () {
            let nameList = utils.generateLegalNameListFromExist({
              char_姓_全部,
              char_姓_末尾字: char_姓_末尾字[0],
              char_必选字_list,
              char_排除字_list,
              chooseType: Const.Choose_Type_财富论,
            });
            store.totalNameCount = nameList.length;
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            store.nameList = nameList;
          }}
        >
          财富论
        </Button>
        <Button
          disabled={storeSnapshot.nameList.length === 0}
          type="primary"
          onClick={() => {
            let nameList = storeSnapshot.nameList;
            let columns = [];
            for (let i = 0; i < nameList.length; i++) {
              let item = nameList[i];
              columns.push(`${item.demoStr}`);
            }

            let str = "姓名\n" + columns.join("\n");

            let blob = new Blob([str], {
              type: "text/plain;charset=utf-8",
            });
            saveAs(blob, "所有可能的姓名发音列表.txt");
          }}
        >
          下载所有姓名方案在电脑查看
        </Button>
      </div>
      <p>姓氏:{input_姓氏}</p>
      {storeSnapshot.nameList.length > 0 ? (
        <p>
          共有{storeSnapshot.totalNameCount}
          种可能的三字名<b>发音</b>, 展示前{storeSnapshot.maxDisplayItem}个,
          每行展示
          {storeSnapshot.columnCount}个
        </p>
      ) : (
        ""
      )}
      <NameList
        nameList={
          storeSnapshot.nameList.slice(
            0,
            storeSnapshot.maxDisplayItem
          ) as CommonType.Type_Name[]
        }
        columnCount={storeSnapshot.columnCount}
      ></NameList>
    </div>
  );
};
