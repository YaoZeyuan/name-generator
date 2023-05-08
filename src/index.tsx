import { useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import PinyinDb_Min_1 from "@/../database/pinyin_db/zd_name_pinyin_db_min_1.json";
// import PinyinDb_Min_5 from "@/../database/pinyin_db/zd_name_pinyin_db_min_5.json";
import PinyinDb_Min_10 from "@/../database/pinyin_db/zd_name_pinyin_db_min_10.json";
import PinyinDb_Min_100 from "@/../database/pinyin_db/zd_name_pinyin_db_min_100.json";
import * as CommonType from "@/../script/common/type";

import { Button, Input, Drawer, Divider, Card, Radio, message } from "antd";
import Desc from "./desc";
import * as utils from "@/utils";
import * as Type from "@/resource/type";
import * as Const from "@/resource/const";
import NameList from "@/component/name_list";
import { saveAs } from "file-saver";

const char_level = utils.getValueByStorage(Const.Storage_Char_Leve_Key, 0);

// 根据汉字级别, 设定所使用的选项集
let Pinyin_Option_List: CommonType.Pinyin_of_Char[] =
  utils.generatePinyinOptionList(PinyinDb_Min_1 as CommonType.Pinyin_Db);

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
  previewNameList: CommonType.Type_Name[];
  totalNameCount: number;
  maxDisplayItem: number;
  columnCount: number;
  status: {
    isLoading: boolean;
    currentTab: Type.ChooseType;
  };
}>({
  /**
   * 用于预览的姓名列表
   */
  previewNameList: [],
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
  status: {
    isLoading: false,
    currentTab: Const.Choose_Type_Option.诗云,
  },
});

export default () => {
  let [input_姓氏, set_input_姓氏] = useState<string>(default_input_姓氏);
  let [input_排除字列表, set_input_排除字列表] =
    useState<string>(default_input_排除字列表);
  let [input_必选字, set_input_必选字] = useState<string>(default_input_必选字);
  let [totalNameList, setTotalNameList] = useState<CommonType.Type_Name[]>([]);

  let storeSnapshot = useSnapshot(store);

  const char_姓_全部 = utils.transString2PinyinList(input_姓氏);
  const char_姓_末尾字 = utils.getPinyinOfChar(
    input_姓氏.split("").pop() ?? ""
  );
  const char_必选字_list = utils.transString2PinyinList(input_必选字);
  const char_排除字_list = utils.transString2PinyinList(input_排除字列表);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      <p>
        <Button
          onClick={async function () {
            store.status.isLoading = true;
            store.previewNameList = [];
            setTotalNameList([]);
            await utils.asyncSleep(100);
            console.log("开始生成候选人名");
            let nameList: CommonType.Type_Name[] = [];
            if (
              storeSnapshot.status.currentTab === Const.Choose_Type_Option.诗云
            ) {
              nameList = utils.generateLegalNameList({
                char_姓_全部,
                char_姓_末尾字: char_姓_末尾字[0],
                char_必选字_list,
                char_排除字_list,
                pinyinOptionList: Pinyin_Option_List,
                generateAll: true,
              });
            } else {
              nameList = utils.generateLegalNameListFromExist({
                char_姓_全部,
                char_姓_末尾字: char_姓_末尾字[0],
                char_必选字_list,
                char_排除字_list,
                chooseType: storeSnapshot.status.currentTab,
                generateAll: true,
              });
            }
            store.status.isLoading = false;
            console.log("候选人名生成完毕");
            // 随机打乱
            nameList.sort(() => Math.random() - 0.5);
            console.log("随机打乱完毕");
            setTotalNameList(nameList);
            store.previewNameList = nameList.slice(0, 1000);
            console.log("数据生成完毕");
          }}
        >
          生成候选方案
        </Button>
        <Divider type="vertical" />

        <Radio.Group
          defaultValue={storeSnapshot.status.currentTab}
          onChange={(event) => {
            store.status.currentTab = event.target.value;
          }}
        >
          <Radio.Button value={Const.Choose_Type_Option.诗云}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.诗云]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.他山石}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.他山石]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.古人云}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.古人云]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.财富论}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.财富论]}
          </Radio.Button>
        </Radio.Group>
      </p>
      <p>
        <Button
          disabled={totalNameList.length === 0}
          type="primary"
          onClick={async () => {
            store.status.isLoading = true;
            await utils.asyncSleep(10);
            let nameList = totalNameList;

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
            message.info(
              `所有可能的姓名发音列表生成完毕, 共${nameList.length}条`
            );
          }}
        >
          下载所有姓名方案在电脑查看
        </Button>
        <Divider type="vertical"></Divider>
        <Button type="dashed" onClick={showDrawer}>
          原理介绍
        </Button>
      </p>
      <p>
        <Drawer
          size="large"
          title="原理介绍"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <Desc></Desc>
        </Drawer>
      </p>
      <p>姓氏:{input_姓氏}</p>
      {storeSnapshot.previewNameList.length > 0 ? (
        <p>
          共生成
          {totalNameList.length}
          种可能的三字名, 展示前
          {storeSnapshot.maxDisplayItem}个, 每行展示
          {storeSnapshot.columnCount}个
        </p>
      ) : (
        ""
      )}
      <Card title="" bordered={false} loading={storeSnapshot.status.isLoading}>
        <NameList
          nameList={storeSnapshot.previewNameList as CommonType.Type_Name[]}
          columnCount={storeSnapshot.columnCount}
        ></NameList>
      </Card>
    </div>
  );
};
