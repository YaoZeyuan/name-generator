import { useEffect, useState } from "react";
import { proxy, snapshot, useSnapshot } from "valtio";
import * as CommonType from "@/script/common/type";

import { DownloadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
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
import Tip from "./component/tip";
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
  "张"
);
let default_姓氏末字_拼音_choose =
  utils.getValueByStorage<CommonType.Char_With_Pinyin>(
    Const.Storage_Key_Map.姓氏末字_拼音_choose,
    {}
  );
let default_input_排除字列表 = utils.getValueByStorage<string>(
  Const.Storage_Key_Map.需过滤字列表,
  "李诞\n呼兰\n思文\n黄西"
);
let default_input_必选字位置 = utils.getValueByStorage<Type.CharSpecifyPos>(
  Const.Storage_Key_Map.必选字位置,
  Const.Char_Specify_Option.不限制
);
let default_input_必选字 = utils.getValueByStorage<string>(
  Const.Storage_Key_Map.必选字,
  "王建国\n呼兰\n庞博\n程璐\n周奇墨"
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
    generateConfig: {
      charSpecifyPos: Type.CharSpecifyPos;
      姓氏末字_拼音_choose: CommonType.Char_With_Pinyin;
    };
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
    generateConfig: {
      charSpecifyPos: default_input_必选字位置,
      姓氏末字_拼音_choose: default_姓氏末字_拼音_choose,
    },
  },
});

export default () => {
  let snapshot = useSnapshot(store);
  let [input_姓氏, set_input_姓氏] = useState<string>(default_input_姓氏);
  let [input_排除字列表, set_input_排除字列表] =
    useState<string>(default_input_排除字列表);
  let [input_必选字, set_input_必选字] = useState<string>(default_input_必选字);
  let [totalNameList, setTotalNameList] = useState<CommonType.Type_Name[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  let str_姓氏 = utils.removeUnChineseChar(input_姓氏);
  let str_必选字 = utils.removeUnChineseChar(input_必选字);
  let str_排除字列表 = utils.removeUnChineseChar(input_排除字列表);
  const char_姓_末尾字 = str_姓氏.split("").pop() ?? "";
  const char_姓_末尾字_PinyinList = utils.getPinyinOfChar(char_姓_末尾字);
  let pinyin_of_姓_末尾字 = char_姓_末尾字_PinyinList[0];

  const const_col_标题_span = 4;
  const const_col_输入框_span = 20;

  let flag姓氏最后一字是否为多音字 = char_姓_末尾字_PinyinList.length > 1;
  let flag已确认姓氏最后一字发音 = true;
  if (flag姓氏最后一字是否为多音字) {
    if (
      snapshot.status.generateConfig.姓氏末字_拼音_choose.char !==
      char_姓_末尾字
    ) {
      flag已确认姓氏最后一字发音 = false;
    } else {
      // 若之前已配置过, 则使用配置的发音
      pinyin_of_姓_末尾字 = snapshot.status.generateConfig.姓氏末字_拼音_choose;
    }
  }

  let ele_选择末尾字发音 = <div></div>;
  if (flag姓氏最后一字是否为多音字) {
    ele_选择末尾字发音 = (
      <Row align="middle">
        <Col span={const_col_标题_span}></Col>
        <Col span={const_col_输入框_span - const_col_标题_span}>
          {char_姓_末尾字}为多音字, 请选择其读音&nbsp;&nbsp;
          <Radio.Group
            defaultValue={
              snapshot.status.generateConfig.姓氏末字_拼音_choose.pinyin
            }
            onChange={(event) => {
              let choosePinyin原始值 = event.target.value;
              let choose拼音配置 = char_姓_末尾字_PinyinList.filter((item) => {
                return item.pinyin === choosePinyin原始值;
              })[0];
              store.status.generateConfig.姓氏末字_拼音_choose = choose拼音配置;
              utils.setValueByStorage(
                Const.Storage_Key_Map.姓氏末字_拼音_choose,
                choose拼音配置
              );
              Tools.reset();
            }}
          >
            {char_姓_末尾字_PinyinList.map((item) => {
              return (
                <Radio.Button key={item.pinyin} value={item.pinyin}>
                  {item.pinyin}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Col>
      </Row>
    );
  }

  const char_姓_全部 = str_姓氏.split("").map((char) => {
    return utils.transString2PinyinList(char)[0];
  });

  const char_必选字_list = utils.transString2PinyinList(str_必选字);
  const char_排除字_list = utils.transString2PinyinList(str_排除字列表);

  // 根据汉字级别, 设定所使用的选项集
  let pinyinOptionList =
    Const.CharDb_Level_Item[snapshot.status.currentCharDbLevel];

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

  let isIn诗云Tab =
    snapshot.status.currentTab === Const.Choose_Type_Option["诗云-所有可能"] ||
    snapshot.status.currentTab === Const.Choose_Type_Option["诗云-按发音合并"];

  let ele诗云字库 = <div></div>;
  if (isIn诗云Tab) {
    ele诗云字库 = (
      <div>
        <div>
          <Space>
            <span>当前诗云候选字条件:</span>
            <Select
              dropdownMatchSelectWidth={false}
              style={{ width: "100%" }}
              value={snapshot.status.currentCharDbLevel}
              onChange={(value: Type.CharDbLevel) => {
                store.status.currentCharDbLevel = value;
                utils.setValueByStorage(
                  Const.Storage_Key_Map.Char_Level,
                  value
                );
                Tools.reset();
              }}
            >
              <Select.Option value={Const.CharDb_Level_Option.标准字库}>
                {Const.CharDb_Level_Show[Const.CharDb_Level_Option.标准字库]}
              </Select.Option>
              <Select.Option value={Const.CharDb_Level_Option.至少出现100次}>
                {
                  Const.CharDb_Level_Show[
                    Const.CharDb_Level_Option.至少出现100次
                  ]
                }
              </Select.Option>
              <Select.Option value={Const.CharDb_Level_Option.至少出现50次}>
                {
                  Const.CharDb_Level_Show[
                    Const.CharDb_Level_Option.至少出现50次
                  ]
                }
              </Select.Option>
              <Select.Option value={Const.CharDb_Level_Option.至少出现10次}>
                {
                  Const.CharDb_Level_Show[
                    Const.CharDb_Level_Option.至少出现10次
                  ]
                }
              </Select.Option>
              <Select.Option value={Const.CharDb_Level_Option.至少出现5次}>
                {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现5次]}
              </Select.Option>
              <Select.Option value={Const.CharDb_Level_Option.至少出现1次}>
                {Const.CharDb_Level_Show[Const.CharDb_Level_Option.至少出现1次]}
              </Select.Option>
            </Select>
          </Space>
        </div>
        <p></p>
      </div>
    );
  }

  let tip = "";
  if (snapshot.previewNameList.length > 0) {
    tip = `, 共有${totalNameList.length}种候选方案`;
    if (totalNameList.length > snapshot.previewNameList.length) {
      tip = `${tip}, 展示前${snapshot.maxDisplayItem}个, 每行展示${snapshot.columnCount}个`;
    }
  }
  return (
    <div>
      <Row align="middle">
        <Col span={const_col_标题_span}>
          <span>请输入姓氏</span>
        </Col>
        <Col span={const_col_输入框_span}>
          <Input
            value={input_姓氏}
            onChange={(e) => {
              let inputValue = e.target.value;
              inputValue = inputValue.trim();
              utils.setValueByStorage(Const.Storage_Key_Map.姓氏, inputValue);
              set_input_姓氏(inputValue);
            }}
          ></Input>
        </Col>
      </Row>
      <Divider
        style={{
          margin: "12px 0px",
        }}
      ></Divider>
      {ele_选择末尾字发音}
      <Divider
        style={{
          margin: "12px 0px",
        }}
      ></Divider>
      <Row align="middle">
        <Col span={const_col_标题_span}>
          <p>需要避开的同音字(例如父母姓名/亲属姓名)</p>
        </Col>
        <Col span={const_col_输入框_span}>
          <Input.TextArea
            autoSize={{
              minRows: 3,
            }}
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
        </Col>
      </Row>
      <Divider
        style={{
          margin: "12px 0px",
        }}
      ></Divider>
      <Row>
        <Col span={const_col_标题_span}>
          <span>指定用字&出现位置(可不填)</span>
        </Col>
        <Col span={const_col_输入框_span}>
          <Radio.Group
            defaultValue={snapshot.status.generateConfig.charSpecifyPos}
            onChange={(event) => {
              store.status.generateConfig.charSpecifyPos = event.target.value;
              utils.setValueByStorage(
                Const.Storage_Key_Map.必选字位置,
                event.target.value
              );
              Tools.reset();
            }}
          >
            <Radio.Button value={Const.Char_Specify_Option.第二位}>
              {Const.Char_Specify_Option.第二位}
              <Tip title="若在第二位指定候选字,则跳过对姓氏+第二位候选字的音韵检查逻辑,直接生成结果"></Tip>
            </Radio.Button>
            <Radio.Button value={Const.Char_Specify_Option.第三位}>
              {Const.Char_Specify_Option.第三位}
            </Radio.Button>
            <Radio.Button value={Const.Char_Specify_Option.不限制}>
              {Const.Char_Specify_Option.不限制}
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <p></p>
      <Row>
        <Col span={const_col_标题_span}></Col>
        <Col span={const_col_输入框_span}>
          <Input.TextArea
            autoSize={{
              minRows: 3,
            }}
            value={input_必选字}
            onChange={(e) => {
              let inputValue = e.target.value;
              utils.setValueByStorage(Const.Storage_Key_Map.必选字, inputValue);
              set_input_必选字(inputValue);
            }}
          ></Input.TextArea>
        </Col>
      </Row>
      <Divider
        style={{
          margin: "12px 0px",
        }}
      ></Divider>
      <div>
        <Button
          type="primary"
          onClick={async function () {
            if (flag已确认姓氏最后一字发音 === false) {
              message.error(
                `姓氏中的 "${char_姓_末尾字}" 为多音字, 请先确认 "${char_姓_末尾字}" 的读音`
              );
              return;
            }

            Tools.reset();
            store.status.isLoading = true;
            await utils.asyncSleep(100);
            console.log("开始生成候选人名");
            let nameList: CommonType.Type_Name[] = [];
            let rawNameList = utils.generateLegalNameList({
              char_姓_全部,
              char_姓_末尾字: pinyin_of_姓_末尾字,
              char_必选字_list,
              char_排除字_list,
              charSpecifyPos: snapshot.status.generateConfig.charSpecifyPos,
              generateType: snapshot.status.currentTab,
              pinyinOptionList: pinyinOptionList,
              generateAll: true,
            });
            store.status.isLoading = false;
            console.log("候选人名生成完毕");

            // 按性别要求进行过滤
            for (let name of rawNameList) {
              switch (snapshot.status.genderType) {
                case Const.Gender_Type.偏男宝:
                  if ([2, 3, 4].includes(name.人名_第二个字.tone)) {
                    nameList.push(name);
                  }
                  break;
                case Const.Gender_Type.偏女宝:
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
            // nameList.sort(() => Math.random() - 0.5);
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
        <Radio.Group
          size="large"
          defaultValue={snapshot.status.currentTab}
          onChange={(event) => {
            store.status.currentTab = event.target.value;
            Tools.reset();
          }}
        >
          <Radio.Button value={Const.Choose_Type_Option.登科录}>
            {Const.Choose_Type_Option.登科录}
            <Tip
              title={Const.Choose_Type_Desc[Const.Choose_Type_Option.登科录]}
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option.古人云}>
            {Const.Choose_Type_Option.古人云}
            <Tip
              title={Const.Choose_Type_Desc[Const.Choose_Type_Option.古人云]}
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["五道口-精选集"]}>
            {Const.Choose_Type_Option["五道口-精选集"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["五道口-精选集"]
                ]
              }
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["五道口-集思录"]}>
            {Const.Choose_Type_Option["五道口-集思录"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["五道口-集思录"]
                ]
              }
            ></Tip>
          </Radio.Button>

          <Radio.Button value={Const.Choose_Type_Option.他山石}>
            {Const.Choose_Type_Option.他山石}
            <Tip
              title={Const.Choose_Type_Desc[Const.Choose_Type_Option.他山石]}
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["财富论-精选集"]}>
            {Const.Choose_Type_Option["财富论-精选集"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["财富论-精选集"]
                ]
              }
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["财富论-集思录"]}>
            {Const.Choose_Type_Option["财富论-集思录"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["财富论-集思录"]
                ]
              }
            ></Tip>
          </Radio.Button>

          <Radio.Button value={Const.Choose_Type_Option["诗云-按发音合并"]}>
            {Const.Choose_Type_Option["诗云-按发音合并"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["诗云-按发音合并"]
                ]
              }
            ></Tip>
          </Radio.Button>
          <Radio.Button value={Const.Choose_Type_Option["诗云-所有可能"]}>
            {Const.Choose_Type_Option["诗云-所有可能"]}
            <Tip
              title={
                Const.Choose_Type_Desc[
                  Const.Choose_Type_Option["诗云-所有可能"]
                ]
              }
            ></Tip>
          </Radio.Button>
        </Radio.Group>
      </div>
      <p></p>
      {ele诗云字库}
      <div>
        <span>按音韵过滤姓名:&nbsp;</span>
        <Radio.Group
          defaultValue={snapshot.status.genderType}
          onChange={(event) => {
            store.status.genderType = event.target.value;
            utils.setValueByStorage(
              Const.Storage_Key_Map.Gender_Type,
              store.status.genderType
            );
            Tools.reset();
          }}
        >
          <Radio.Button value={Const.Gender_Type.偏男宝}>
            {Const.Gender_Type.偏男宝}
            <Tip title="男宝的姓名一般以二/四声结尾, 简洁有力, 三声亦可" />
          </Radio.Button>
          <Radio.Button value={Const.Gender_Type.偏女宝}>
            {Const.Gender_Type.偏女宝}
            <Tip title="女宝的姓名一般以一声结尾, 温文尔雅, 三声亦可" />
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
      <Card title="" bordered={false} loading={snapshot.status.isLoading}>
        <NameList
          nameList={snapshot.previewNameList as CommonType.Type_Name[]}
          columnCount={snapshot.columnCount}
        ></NameList>
      </Card>
    </div>
  );
};
