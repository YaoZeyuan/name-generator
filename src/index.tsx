import { useEffect, useState } from "react";
import { proxy, snapshot, useSnapshot } from "valtio";
import * as CommonType from "@/script/common/type";

import { DownloadOutlined, QuestionCircleFilled } from "@ant-design/icons";
import {
  Button,
  Input,
  Drawer,
  Divider,
  Card,
  Radio,
  message,
  Select,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import Desc from "./desc";
import * as utils from "@src/utils";
import * as Type from "@src/resource/type";
import * as Const from "@src/resource/const";
import NameList from "@src/component/name_list";
import { saveAs } from "file-saver";

const default_char_level = utils.getValueByStorage<Type.CharDbLevel>(
  Const.Storage_Key_Map.Char_Level,
  Const.CharDb_Level_Option["至少出现10次"]
);

let default_input_姓氏 = utils.getValueByStorage<string>(
  Const.Storage_Key_Map.姓氏,
  ""
);
let default_input_排除字列表 = utils.getValueByStorage<string>(
  Const.Storage_Key_Map.需过滤字列表,
  ""
);
let default_input_必选字 = utils.getValueByStorage<string>(
  Const.Storage_Key_Map.必选字,
  ""
);
let default_gender_type = utils.getValueByStorage<Type.GenderType>(
  Const.Storage_Key_Map.Gender_Type,
  Const.Gender_Type.都看看
);

const store = proxy<{
  previewNameList: CommonType.Type_Name[];
  totalNameCount: number;
  maxDisplayItem: number;
  columnCount: number;
  status: {
    isLoading: boolean;
    currentTab: Type.ChooseType;
    currentCharDbLevel: Type.CharDbLevel;
    genderType: Type.GenderType;
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
    currentTab: Const.Choose_Type_Option.古人云,
    currentCharDbLevel: default_char_level,
    genderType: default_gender_type,
  },
});

export default () => {
  let [input_姓氏, set_input_姓氏] = useState<string>(default_input_姓氏);
  let [input_排除字列表, set_input_排除字列表] =
    useState<string>(default_input_排除字列表);
  let [input_必选字, set_input_必选字] = useState<string>(default_input_必选字);
  let [totalNameList, setTotalNameList] = useState<CommonType.Type_Name[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  let storeSnapshot = useSnapshot(store);

  const char_姓_全部 = utils.transString2PinyinList(
    utils.removeUnChineseChar(input_姓氏)
  );
  const char_姓_末尾字 = utils.getPinyinOfChar(
    input_姓氏.split("").pop() ?? ""
  );
  const char_必选字_list = utils.transString2PinyinList(
    utils.removeUnChineseChar(input_必选字)
  );
  const char_排除字_list = utils.transString2PinyinList(
    utils.removeUnChineseChar(input_排除字列表)
  );

  // 根据汉字级别, 设定所使用的选项集
  let pinyinOptionList =
    Const.CharDb_Level_Item[storeSnapshot.status.currentCharDbLevel];

  const showDrawer = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const Tools = {
    reset: () => {
      store.status.isLoading = false;
      store.previewNameList = [];
      setTotalNameList([]);
    },
  };

  let tip = "";
  if (storeSnapshot.previewNameList.length > 0) {
    tip = `, 共生成${totalNameList.length}种可能的三字名`;
    if (totalNameList.length > storeSnapshot.previewNameList.length) {
      tip = `${tip}, 展示前${storeSnapshot.maxDisplayItem}个, 每行展示${storeSnapshot.columnCount}个`;
    }
  }
  return (
    <div>
      <div>
        <span>请输入姓氏</span>
        <input
          value={input_姓氏}
          onChange={(e) => {
            let inputValue = e.target.value;
            inputValue = inputValue.trim();
            utils.setValueByStorage(Const.Storage_Key_Map.姓氏, inputValue);
            set_input_姓氏(inputValue);
          }}
        ></input>
      </div>
      <p></p>
      <div>
        <p>需要避开的同音字(例如父母姓名/亲属姓名)</p>
        <Input.TextArea
          autoSize
          value={input_排除字列表}
          onChange={(e) => {
            let inputValue = e.target.value;
            utils.setValueByStorage(
              Const.Storage_Key_Map.需过滤字列表,
              inputValue
            );
            set_input_排除字列表(inputValue);
          }}
        ></Input.TextArea>
      </div>
      <p></p>
      <div>
        <p>指定出现的字(可不填)</p>
        <Tabs></Tabs>
        <Input.TextArea
          autoSize
          value={input_必选字}
          onChange={(e) => {
            let inputValue = e.target.value;
            utils.setValueByStorage(Const.Storage_Key_Map.必选字, inputValue);
            set_input_必选字(inputValue);
          }}
        ></Input.TextArea>
      </div>
      <p></p>
      <div>
        <Button
          type="primary"
          onClick={async function () {
            store.status.isLoading = true;
            Tools.reset();
            await utils.asyncSleep(100);
            console.log("开始生成候选人名");
            let rawNameList: CommonType.Type_Name[] = [];
            let nameList: CommonType.Type_Name[] = [];
            if (
              storeSnapshot.status.currentTab === Const.Choose_Type_Option.诗云
            ) {
              rawNameList = utils.generateLegalNameList({
                char_姓_全部,
                char_姓_末尾字: char_姓_末尾字[0],
                char_必选字_list,
                char_排除字_list,
                pinyinOptionList: pinyinOptionList,
                generateAll: true,
              });
            } else {
              rawNameList = utils.generateLegalNameListFromExist({
                char_姓_全部,
                char_姓_末尾字: char_姓_末尾字[0],
                char_必选字_list,
                char_待排除的同音字_list: char_排除字_list,
                chooseType: storeSnapshot.status.currentTab,
                generateAll: true,
              });
            }
            store.status.isLoading = false;
            console.log("候选人名生成完毕");

            // 按性别要求进行过滤
            for (let name of rawNameList) {
              switch (storeSnapshot.status.genderType) {
                case Const.Gender_Type.男宝:
                  if ([2, 3, 4].includes(name.人名_第二个字.tone)) {
                    nameList.push(name);
                  }
                  break;
                case Const.Gender_Type.女宝:
                  if ([1, 3].includes(name.人名_第二个字.tone)) {
                    nameList.push(name);
                  }
                  break;
                case Const.Gender_Type.都看看:
                default:
                  nameList.push(name);
              }
            }

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
      </div>
      <p></p>
      <div>
        <Space>
          <span>当前诗云候选字条件:</span>
          <Select
            dropdownMatchSelectWidth={false}
            style={{ width: "100%" }}
            value={storeSnapshot.status.currentCharDbLevel}
            onChange={(value: Type.CharDbLevel) => {
              store.status.currentCharDbLevel = value;
              utils.setValueByStorage(Const.Storage_Key_Map.Char_Level, value);
              Tools.reset();
            }}
          >
            <Select.Option value={Const.CharDb_Level_Option.至少出现1次}>
              {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现1次]}
            </Select.Option>
            <Select.Option value={Const.CharDb_Level_Option.至少出现5次}>
              {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现5次]}
            </Select.Option>
            <Select.Option value={Const.CharDb_Level_Option.至少出现10次}>
              {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现10次]}
            </Select.Option>
            <Select.Option value={Const.CharDb_Level_Option.至少出现50次}>
              {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现50次]}
            </Select.Option>
            <Select.Option value={Const.CharDb_Level_Option.至少出现100次}>
              {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现100次]}
            </Select.Option>
          </Select>
        </Space>
      </div>
      <p></p>

      <div>
        <Radio.Group
          defaultValue={storeSnapshot.status.currentTab}
          onChange={(event) => {
            store.status.currentTab = event.target.value;
            Tools.reset();
          }}
        >
          <Radio.Button value={Const.Choose_Type_Option.诗云}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.诗云]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.他山石}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.他山石]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.财富论}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.财富论]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["五道口_精华版"]}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option["五道口_精华版"]]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.古人云}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.古人云]}
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.登科录}>
            {Const.Choose_Type_Show[Const.Choose_Type_Option.登科录]}
          </Radio.Button>
        </Radio.Group>
      </div>
      <p></p>
      <div>
        <span>按音韵过滤姓名:&nbsp;</span>
        <Radio.Group
          defaultValue={storeSnapshot.status.genderType}
          onChange={(event) => {
            store.status.genderType = event.target.value;
            utils.setValueByStorage(
              Const.Storage_Key_Map.Gender_Type,
              store.status.genderType
            );
            Tools.reset();
          }}
        >
          <Radio.Button value={Const.Gender_Type.男宝}>
            {Const.Gender_Type.男宝}
          </Radio.Button>
          <Radio.Button value={Const.Gender_Type.女宝}>
            {Const.Gender_Type.女宝}
          </Radio.Button>
          <Radio.Button value={Const.Gender_Type.都看看}>
            {Const.Gender_Type.都看看}
          </Radio.Button>
        </Radio.Group>
      </div>
      <p></p>
      <div>
        <Button
          type="primary"
          shape="round"
          ghost
          icon={<DownloadOutlined />}
          disabled={totalNameList.length === 0}
          onClick={async () => {
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
        <Button ghost type="primary" shape="round" onClick={showDrawer}>
          原理介绍
        </Button>
      </div>
      <Drawer
        size="large"
        title="原理介绍"
        placement="right"
        onClose={onClose}
        open={isOpen}
      >
        <Desc></Desc>
      </Drawer>
      <p>
        姓氏:{input_姓氏}
        {tip}
      </p>
      <Card title="" bordered={false} loading={storeSnapshot.status.isLoading}>
        <NameList
          nameList={storeSnapshot.previewNameList as CommonType.Type_Name[]}
          columnCount={storeSnapshot.columnCount}
        ></NameList>
      </Card>
    </div>
  );
};
